import { readFileSync, statSync } from 'node:fs';
import { resolve, sep, extname } from 'node:path';
import { pathToFileURL } from 'node:url';

export function validateContent(site, root = process.cwd()) {
  const errors = [];
  const text = (value, label, max, optional = false) => {
    if (optional && (value === undefined || value === '')) return;
    if (typeof value !== 'string' || !value.trim() || value.length > max) errors.push(`${label}: enter text up to ${max} characters.`);
  };
  const media = (value, label, video = false) => {
    const prefix = video ? 'uploads/videos/' : 'src/assets/';
    const base = (process.env.BASE_PATH || '/heral-metal').replace(/^\/+|\/+$/g, '');
    let relative = typeof value === 'string' ? value.replace(/^\/+/, '') : '';
    if (base && relative.startsWith(`${base}/`)) relative = relative.slice(base.length + 1);
    try {
      relative = decodeURIComponent(relative);
      if (!relative.startsWith(prefix)) throw new Error('Media must be local');
      const folder = resolve(root, video ? 'public/uploads/videos' : 'src/assets');
      const file = resolve(root, video ? 'public' : '', relative);
      const extensions = video ? ['.mp4'] : ['.jpg', '.jpeg', '.png', '.webp'];
      const info = statSync(file);
      if (!file.startsWith(folder + sep) || !extensions.includes(extname(file).toLowerCase()) || !info.isFile() || !info.size || info.size > (video ? 25 : 5) * 1024 * 1024) throw new Error('Invalid media');
    } catch {
      errors.push(`${label}: choose an existing ${video ? 'MP4 up to 25 MB' : 'JPG, PNG or WebP up to 5 MB'}.`);
    }
  };
  if (!site || typeof site !== 'object') return ['Content must be an object.'];
  media(site.home?.image, 'Homepage image');
  for (const lang of ['mk', 'en']) {
    text(site.home?.[lang]?.tagline, `Homepage ${lang} description`, 260);
    text(site.home?.[lang]?.imageAlt, `Homepage ${lang} image description`, 180);
    for (const [key, max] of [['aboutTitle', 180], ['aboutBody', 2000], ['certificatesTitle', 200], ['certificatesBody', 1000]]) text(site.about?.[lang]?.[key], `About ${lang} ${key}`, max);
    text(site.business?.[lang]?.note, `Contact ${lang} note`, 250, true);
    for (const id of ['metal-structures', 'machine-maintenance', 'gas-pipelines']) {
      const service = site.services?.[id]?.[lang];
      for (const [key, max] of [['title', 80], ['short', 220], ['description', 600]]) text(service?.[key], `${id} ${lang} ${key}`, max);
      if (!Array.isArray(service?.scope) || service.scope.length !== 3) errors.push(`${id} ${lang}: keep three scope points.`);
      else service.scope.forEach(item => text(item, `${id} ${lang} scope`, 180));
    }
  }
  if (typeof site.business?.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.business.email)) errors.push('Contact: enter a valid email address.');
  if (!Array.isArray(site.gallery) || site.gallery.length > 80) errors.push('Gallery: use a list with at most 80 items.');
  else for (const [i, item] of site.gallery.entries()) {
    const label = `Gallery item ${i + 1}`;
    if (!['image', 'video'].includes(item?.kind)) errors.push(`${label}: choose image or video.`);
    for (const lang of ['mk', 'en']) {
      text(item?.[lang]?.title, `${label} ${lang} title`, 100);
      text(item?.[lang]?.description, `${label} ${lang} description`, 500, true);
    }
    if (typeof item?.visible !== 'boolean' || typeof item?.illustrative !== 'boolean') errors.push(`${label}: set visibility and illustrative toggles.`);
    media(item?.image, `${label} photograph / video cover`);
    if (item?.kind === 'video') media(item?.video, `${label} video`, true);
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try {
    const errors = validateContent(JSON.parse(readFileSync('src/content/site.json', 'utf8')));
    if (errors.length) {
      console.error(`CMS content cannot be published:\n${errors.map(error => `- ${error}`).join('\n')}`);
      process.exitCode = 1;
    } else console.log('CMS content valid: both languages, gallery, services, homepage, about and contact.');
  } catch (error) {
    console.error(`Cannot read CMS content: ${error.message}`);
    process.exitCode = 1;
  }
}
