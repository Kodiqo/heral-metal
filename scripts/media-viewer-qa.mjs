import { chromium } from 'playwright';
import { readFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { serveDist } from './serve-dist.mjs';

const { server, url } = await serveDist();
let browser;
try {
  browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({ reducedMotion: 'reduce', hasTouch: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const axe = await readFile('node_modules/axe-core/axe.min.js', 'utf8');
  await mkdir('test-results', { recursive: true });
  for (const route of ['projects/', 'en/projects/']) {
    for (const [width, height] of [[320, 800], [375, 900], [768, 500], [1440, 1000]]) {
      await page.setViewportSize({ width, height });
      await page.goto(url + route);
      const trigger = page.locator('[data-gallery-index="0"]');
      await trigger.click();
      await page.waitForFunction(() => document.querySelector('.viewer-stage').getAttribute('aria-busy') === 'false');
      assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
      assert.equal(await page.locator('.viewer-controls').isVisible(), false);
      assert.equal(await page.locator('.viewer-fullscreen').isVisible(), true);
      const layout = await page.locator('.cinematic-viewer').evaluate(el => ({
        overflow: el.scrollWidth > el.clientWidth,
        controlsVisible: [...el.querySelectorAll('.viewer-header button,.viewer-navigation button')].every(button => {
          const r = button.getBoundingClientRect();
          return r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight;
        }),
        imageHeight: el.querySelector('img').getBoundingClientRect().height,
      }));
      assert.equal(layout.overflow, false);
      assert.equal(layout.controlsVisible, true);
      assert.ok(layout.imageHeight > 60);
      await page.addScriptTag({ content: axe });
      const audit = await page.evaluate(() => window.axe.run(document, { runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } }));
      assert.deepEqual(audit.violations.map(v => ({ id: v.id, targets: v.nodes.map(n => n.target) })), []);
      await page.keyboard.press('ArrowRight');
      assert.equal(await page.locator('#gallery-position').textContent(), '2 / 6');
      await page.keyboard.press('ArrowLeft');
      await page.keyboard.press('ArrowLeft');
      assert.equal(await page.locator('#gallery-position').textContent(), '6 / 6');
      await page.locator('.viewer-next').click();
      assert.equal(await page.locator('#gallery-position').textContent(), '1 / 6');
      await page.locator('.viewer-stage').evaluate(el => {
        const point = new Touch({ identifier: 1, target: el, clientX: 250, clientY: 100 });
        el.dispatchEvent(new TouchEvent('touchstart', { touches: [point], bubbles: true }));
        const end = new Touch({ identifier: 1, target: el, clientX: 100, clientY: 100 });
        el.dispatchEvent(new TouchEvent('touchend', { changedTouches: [end], bubbles: true }));
      });
      assert.equal(await page.locator('#gallery-position').textContent(), '2 / 6');
      if (width === 1440) {
        await page.locator('.viewer-fullscreen').click();
        await page.waitForFunction(() => Boolean(document.fullscreenElement));
        await page.keyboard.press('f');
        await page.waitForFunction(() => !document.fullscreenElement);
        assert.equal(await page.locator('dialog').evaluate(el => el.open), true);
      }
      await page.screenshot({ path: `test-results/viewer-${route.startsWith('en/') ? 'en' : 'mk'}-${width}.png` });
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').evaluate(el => el.open), false);
      await page.waitForFunction(() => !document.body.classList.contains('dialog-open'));
      assert.equal(await trigger.evaluate(el => el === document.activeElement), true);
      assert.equal(await page.locator('body').evaluate(el => getComputedStyle(el).overflow), 'visible');
      console.log(`${route} @ ${width}x${height}: layout, accessibility, keyboard, swipe and focus passed`);
    }
  }
  // Exercise video playback using a locally generated clip, without adding sample media to the site.
  await page.goto(url + 'en/projects/');
  await page.evaluate(async () => {
    const canvas = document.createElement('canvas');
    canvas.width = 320; canvas.height = 180;
    const ctx = canvas.getContext('2d');
    const stream = canvas.captureStream(20);
    const recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
    const chunks = [];
    recorder.ondataavailable = event => chunks.push(event.data);
    const finished = new Promise(resolve => { recorder.onstop = resolve; });
    recorder.start();
    let frame = 0;
    const timer = setInterval(() => { ctx.fillStyle = frame++ % 2 ? '#123cf0' : '#f4f3ee'; ctx.fillRect(0, 0, 320, 180); }, 50);
    await new Promise(resolve => setTimeout(resolve, 600));
    recorder.stop();
    await finished;
    clearInterval(timer);
    stream.getTracks().forEach(track => track.stop());
    const trigger = document.querySelector('[data-gallery-index="0"]');
    trigger.dataset.kind = 'video';
    trigger.dataset.src = URL.createObjectURL(new Blob(chunks, { type: 'video/webm' }));
  });
  await page.locator('[data-gallery-index="0"]').click();
  await page.waitForFunction(() => document.querySelector('video')?.readyState >= 2);
  assert.equal(await page.locator('.viewer-controls').isVisible(), true);
  await page.locator('video').evaluate(video => { video.pause(); video.currentTime = 0; });
  await page.locator('.viewer-toggle').click();
  await page.waitForFunction(() => !document.querySelector('video').paused);
  await page.locator('.viewer-mute').click();
  assert.equal(await page.locator('video').evaluate(video => video.muted), false);
  await page.locator('.viewer-volume').fill('0.4');
  assert.equal(await page.locator('video').evaluate(video => video.volume), 0.4);
  await page.locator('.viewer-seek').fill('25');
  await page.keyboard.press('ArrowRight');
  // Range controls keep arrow keys; navigation changes only after focus leaves them.
  assert.equal(await page.locator('#gallery-position').textContent(), '1 / 6');
  await page.locator('.viewer-next').click();
  assert.equal(await page.locator('video').count(), 0);
  assert.equal(await page.locator('.viewer-controls').isVisible(), false);
  await page.locator('.media-close').click();
  await page.locator('[data-gallery-index="0"]').evaluate(el => { el.dataset.kind = 'image'; el.dataset.src = '/missing-viewer-image.webp'; });
  await page.locator('[data-gallery-index="0"]').click();
  await page.waitForFunction(() => !document.querySelector('.viewer-retry').hidden);
  assert.match(await page.locator('.viewer-status').textContent(), /could not load/);
  await page.locator('[data-gallery-index="0"]').evaluate(el => { el.dataset.src = document.querySelector('[data-gallery-index="1"]').dataset.src; });
  await page.locator('.viewer-retry').click();
  await page.waitForFunction(() => document.querySelector('.viewer-stage').getAttribute('aria-busy') === 'false' && document.querySelector('dialog img')?.naturalWidth > 0);
  assert.equal(await page.locator('.viewer-retry').isVisible(), false);
  await page.keyboard.press('Escape');
  assert.deepEqual(errors, []);
  console.log('Video playback, sound, volume, seek, media cleanup and error recovery passed');
} finally {
  await browser?.close();
  await new Promise(resolve => server.close(resolve));
}
