import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { serveDist } from './serve-dist.mjs';
const content = JSON.parse(await readFile('src/content/site.json', 'utf8'));
const projects = content.projects.filter(project => project.visible);
const { server, url } = await serveDist();
let browser;
try {
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage({ reducedMotion: 'reduce' });
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
  await mkdir('test-results', { recursive: true });
  for (const lang of ['mk', 'en']) {
    const prefix = lang === 'en' ? 'en/' : '';
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(url + prefix + 'projects/');
      assert.equal(await page.locator('.project-card').count(), projects.length);
      assert.equal(await page.locator('dialog').count(), 0, 'Project cards navigate to a page');
      for (const [index, project] of projects.entries()) {
        await page.locator('.project-card').nth(index).click();
        assert.equal(page.url(), url + prefix + `projects/${project.slug}/`);
        assert.equal(await page.locator('h1').textContent(), project[lang].title);
        assert.equal(await page.locator('.desktop-nav [aria-current="page"]').textContent(), lang === 'en' ? 'Projects' : 'Проекти');
        const items = project.media.filter(item => item.visible);
        const triggers = page.locator('[data-gallery-index]');
        assert.deepEqual(await triggers.evaluateAll(elements => elements.map(el => el.dataset.title)), items.map(item => item[lang].title));
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
        const otherLang = lang === 'mk' ? 'en' : 'mk';
        const languageLink = await page.locator(`.languages a[lang="${otherLang}"]`).getAttribute('href');
        assert.ok(languageLink.endsWith(`${otherLang === 'en' ? 'en/' : ''}projects/${project.slug}/`));
        await page.addScriptTag({ content: axe });
        const audit = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
        assert.deepEqual(audit.violations.map(v => ({ id: v.id, nodes: v.nodes.map(n => n.target) })), []);
        if (items.length) {
          await triggers.first().click();
          assert.equal(await page.locator('#gallery-position').textContent(), `1 / ${items.length}`);
          await page.keyboard.press('ArrowLeft');
          assert.equal(await page.locator('#gallery-position').textContent(), `${items.length} / ${items.length}`);
          assert.equal(await page.locator('.media-dialog-title').textContent(), items.at(-1)[lang].title);
          await page.keyboard.press('ArrowRight');
          assert.equal(await page.locator('#gallery-position').textContent(), `1 / ${items.length}`);
          await page.keyboard.press('Escape');
          await page.waitForFunction(() => !document.body.classList.contains('dialog-open'));
        }
        if (index === 0) await page.screenshot({ path: `test-results/project-${lang}-${width}.png`, fullPage: true });
        await page.locator('.project-back').click();
        assert.equal(page.url(), url + prefix + 'projects/');
      }
      console.log(`${lang} @ ${width}px: project links, isolated galleries, language links, return navigation and accessibility passed`);
    }
  }
  for (const project of content.projects.filter(project => !project.visible)) {
    const response = await page.goto(url + `projects/${project.slug}/`);
    assert.equal(response.status(), 404, 'Hidden projects must not have published pages');
  }
  assert.deepEqual(errors, []);
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
