import type { ImageMetadata } from 'astro';
import { images } from '../data/images';
import { asset, base } from './routes';

const uploads = import.meta.glob<{ default: ImageMetadata }>('../assets/**/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true });

export function imageSource(name: string): ImageMetadata {
  if (Object.hasOwn(images, name)) return images[name as keyof typeof images];
  const source = uploads[name.replace(/^\/?src\/assets\//, '../assets/')]?.default;
  if (!source) throw new Error(`Unknown image: ${name}`);
  return source;
}

/** CMS video paths are independent of the GitHub Pages deployment prefix. */
export function videoUrl(path: string): string {
  const relative = base && path.startsWith(`${base}/`) ? path.slice(base.length) : path;
  return asset(relative);
}
