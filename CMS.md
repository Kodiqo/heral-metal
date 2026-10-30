# Heral Metal content editor

Heral Metal uses the same hosted [Pages CMS](https://app.pagescms.org/) setup as LiftGo. The Macedonian start page is at `/admin/`. Invited collaborators sign in through email; the owner connects the GitHub App. The website stays static on GitHub Pages.

## Editable content

| Editor | Content |
| --- | --- |
| 01 · Проекти и нивни галерии | Add projects with stable URL slugs, covers and bilingual descriptions; manage each project’s own photographs/videos |
| 02 · Почетна страница | Replace the main photograph and edit its description and introduction in both languages |
| 03 · Услуги | Edit the three existing services, their descriptions and three scope points in both languages |
| 04 · За нас и сертификати | Edit the company introduction and certificate section introduction in both languages |
| 05 · Контакт | Edit the public email and optional contact notes in both languages |

The ISO standards, detailed management policy, service URLs, branding and form delivery recipient remain owner-managed. Changing the public contact email does not change FormSubmit delivery. That recipient is configured separately with `PUBLIC_FORMSUBMIT_RECIPIENT`.

Content lives in `src/content/site.json`. Keep `settings.content.merge: true` in `.pages.yml`: each editor manages a different part of the same file. All current content is seeded so the initial integration preserves the site's appearance.

## Uploads and publishing

Photographs and video covers go to `src/assets` and are optimized by Astro. Use JPG, PNG or WebP, ideally below 2 MB (build limit: 5 MB). MP4 videos go to `public/uploads/videos`, ideally below 20 MB (build limit: 25 MB). Every video needs a cover image. Upload filenames are randomized by Pages CMS.

Project cards open dedicated pages in both languages. In “01 · Проекти и нивни галерии”, add a project, set its unique lowercase URL slug and cover, then add photos/videos inside its “Фотографии и видеа во овој проект” list. Keep the slug unchanged after sharing the page link. Hiding a project removes both its card and its generated pages; hiding one media item affects only that gallery.

Both languages need titles. Descriptions are optional. Hiding a gallery entry is reversible. Empty galleries show a short placeholder. Illustrative entries retain the corresponding disclosure in the viewer; newly added real work is not automatically labeled illustrative.

Saving creates a Git commit. The existing deployment workflow validates both languages, service structure, email, file existence and upload limits before building. A failed build keeps the previous published deployment; the owner must correct the invalid content. The editor's upload UI does not enforce the build size limits.

## One-time owner setup

1. Publish `.pages.yml` and these changes to `main`.
2. Sign into [Pages CMS](https://app.pagescms.org/Kodiqo/heral-metal/main) using the repository owner's GitHub account.
3. Grant the Pages CMS GitHub App access to `Kodiqo/heral-metal`.
4. Open the repository on `main` and confirm the five editors appear.
5. Invite the intended editor email through Pages CMS collaborator management. Invitations are stored by Pages CMS, not in this repository.
6. In a separate browser profile, verify the invited editor can sign in using email. Make a small content edit, wait for deployment and confirm it on the live site. Restore the sample edit.
7. Upload a photograph and an MP4 with a cover, verify both languages and the viewer, and verify hide/show. Repeat one edit on a phone before handing over access.

The local implementation does not install the GitHub App, send invitations or verify hosted email authentication. These owner actions and a real publishing test remain necessary before client handoff. No invitation has been sent.

## Local checks

```sh
npm run validate:content
npm run verify
npm run test:viewer
```

[Pages CMS configuration](https://pagescms.org/docs/configuration/), [merge behavior](https://pagescms.org/docs/configuration/settings/), [email collaborators](https://pagescms.org/docs/configuration/collaborators/).
