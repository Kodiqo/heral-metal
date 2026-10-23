import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { validateContent } from '../scripts/validate-content.mjs';
const original = JSON.parse(readFileSync('src/content/site.json', 'utf8'));

test('CMS seed content is valid in both languages', () => {
  assert.deepEqual(validateContent(original), []);
});
test('CMS rejects missing translations, incomplete services and invalid contact details', () => {
  const site = structuredClone(original);
  site.home.en.imageAlt = '';
  site.services['metal-structures'].mk.scope.pop();
  site.business.email = 'invalid';
  const errors = validateContent(site);
  assert.ok(errors.some(error => error.includes('Homepage en')));
  assert.ok(errors.some(error => error.includes('three scope')));
  assert.ok(errors.some(error => error.includes('email')));
});
test('CMS rejects unsafe or missing media and video entries without a clip or cover', () => {
  for (const image of ['/src/assets/missing.png', '/src/assets/../../../package.json', 'https://example.com/image.png']) {
    const site = structuredClone(original);
    site.home.image = image;
    assert.ok(validateContent(site).some(error => error.includes('Homepage image')));
  }
  const site = structuredClone(original);
  site.gallery[0].kind = 'video';
  site.gallery[0].image = '';
  assert.ok(validateContent(site).some(error => error.includes('video cover')));
  assert.ok(validateContent(site).some(error => error.includes('MP4')));
});
test('CMS permits hiding projects or an empty gallery without breaking the site', () => {
  const site = structuredClone(original);
  site.gallery.forEach(item => { item.visible = false; });
  assert.deepEqual(validateContent(site), []);
  site.gallery = [];
  assert.deepEqual(validateContent(site), []);
});
