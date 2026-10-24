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
  site.projects[0].media[0].kind = 'video';
  site.projects[0].media[0].image = '';
  assert.ok(validateContent(site).some(error => error.includes('video cover')));
  assert.ok(validateContent(site).some(error => error.includes('MP4')));
});
test('CMS permits hiding projects or an empty gallery without breaking the site', () => {
  const site = structuredClone(original);
  site.projects.forEach(item => { item.visible = false; });
  assert.deepEqual(validateContent(site), []);
  site.projects = [];
  assert.deepEqual(validateContent(site), []);
});

test('project links must have unique valid slugs', () => {
  for (const slug of [original.projects[0].slug, '../another-project', '', 'Invalid Slug']) {
    const site = structuredClone(original);
    site.projects[1].slug = slug;
    assert.ok(validateContent(site).some(error => error.includes('unique URL slug')));
  }
});
test('each project validates its own gallery and supports an empty gallery', () => {
  const site = structuredClone(original);
  site.projects[0].media = [];
  assert.deepEqual(validateContent(site), []);
  site.projects[1].media[0].en.title = '';
  assert.ok(validateContent(site).some(error => error.includes('Project 2 gallery item 1 en title')));
});
