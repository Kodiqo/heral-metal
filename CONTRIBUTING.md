# Contributing

1. Fork or branch from `main`.
2. Use Node.js 24+ and install with `npm ci`.
3. Run `npm run dev` while working and `npm run verify` before opening a pull request
   (type check, content validation, build and tests).
4. For UI changes also run `npm run test:browser` (see the README for browser setup).
5. Keep Macedonian and English content in sync. Shared copy lives in `src/data/` and
   `src/content/site.json`.

Commit messages: short imperative summary, e.g. `Add gas pipelines gallery`.
