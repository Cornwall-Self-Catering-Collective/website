# Cornwall Self-Catering Collective website

The public website for the Cornwall Self-Catering Collective. It is a static
[Astro](https://astro.build/) site styled with Tailwind CSS, with articles
managed as Markdown files through [Decap CMS](https://decapcms.org/).

The live site is [cornwallselfcateringcollective.co.uk](https://cornwallselfcateringcollective.co.uk/).

## Useful links

- **Live site:** [cornwallselfcateringcollective.co.uk](https://cornwallselfcateringcollective.co.uk/)
- **Content admin:** [cornwallselfcateringcollective.co.uk/admin/](https://cornwallselfcateringcollective.co.uk/admin/)
- **Source repository:** [Cornwall-Self-Catering-Collective/website](https://github.com/Cornwall-Self-Catering-Collective/website)
- **GitHub organisation:** [Cornwall-Self-Catering-Collective](https://github.com/Cornwall-Self-Catering-Collective)

The admin URL is served by the site, but publishing edits from it also requires
the GitHub CMS authentication setup described below.

## Local setup

### Requirements

- [Node.js](https://nodejs.org/) `22.13.0` or newer
- [pnpm](https://pnpm.io/), enabled with Corepack
- Git access to the repository if you will edit or publish content

Install and activate pnpm once if it is not already available:

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

Then clone the repository and install its dependencies. Astro is listed in the
project dependencies, so `pnpm install` installs the correct project version;
do not install Astro globally.

```bash
git clone git@github.com:Cornwall-Self-Catering-Collective/website.git
cd website
pnpm install
```

Run the local site:

```bash
pnpm dev
```

Astro prints the local URL, normally `http://localhost:4321`. Build and preview
the production output with:

```bash
pnpm build
pnpm preview
```

Use pnpm for dependency changes so `pnpm-lock.yaml` remains the authoritative
lockfile. There are no application environment variables required for the
static site itself.

## Day-to-day maintenance

- Page routes are in `src/pages/`.
- The shared header, footer and base markup are in `src/layouts/BaseLayout.astro`.
- Global styling is in `src/styles/global.css`; Tailwind is configured in
  `astro.config.mjs`.
- Static images and other public files are in `public/`.
- Article images uploaded through the CMS go in `public/assets/uploads/`.
- Reusable editable page copy uses one-entry content collections:
   - Homepage copy in `src/content/homepage/index.md`
   - About page copy in `src/content/about/index.md`
   - Matching CMS fields in `public/admin/config.yml` under `collections: pages`

Run `pnpm build` before opening a pull request or publishing manual changes.

## Articles and the admin

Articles are Markdown files in `src/content/articles/`. Their required front
matter is defined in `src/content.config.ts` and includes:

```yaml
title: Article title
category: Collective news
excerpt: A short summary used on the articles page.
order: 1
published: true
```

`order` must be a positive whole number and controls the displayed order.
Set `published: false` to keep an article out of the public articles listing.

### Editing locally

Start both services in separate terminals:

```bash
pnpm dev
```

```bash
pnpm cms
```

Then open `http://localhost:4321/admin/`. Decap's local backend saves changes
to your working copy. Review the generated Markdown, test the site and commit
the changes as usual.

### Editing on the live site

The live admin loads Decap CMS at `/admin/` and is configured to write to the
`main` branch of `Cornwall-Self-Catering-Collective/website`. Saved changes
create commits in GitHub, so the hosting service must build and deploy updates
from that branch.

The repository contains the CMS configuration in `public/admin/config.yml`, but
does **not** contain a production GitHub OAuth service. 

Keep the following values aligned if the repository, branch or domain changes:

- `backend.repo` and `backend.branch` in `public/admin/config.yml`
- `site_url` and `display_url` in `public/admin/config.yml`
- the hosting provider's repository, branch and custom-domain settings
- the OAuth application's callback URL and allowed origins

## Adding editors

The practical access model is GitHub access: a person must be able to authorise
with GitHub and have write access to this repository.

1. Invite them to the `Cornwall-Self-Catering-Collective` GitHub organisation,
   or add them as a collaborator on the `website` repository.
2. Grant the least privilege that allows content commits (normally the
   repository's **Write** role).
3. Ensure the GitHub OAuth application used by Decap permits the person and the
   organisation. Organisation security policies may require an owner to approve
   the app.
4. Ask the editor to sign in at the live admin URL and create a draft article as
   a smoke test.

Removing their GitHub repository access also removes their ability to publish
through Decap. GitHub organisation owners and the OAuth application credentials
remain sensitive administrative access and should be limited to trusted
maintainers.

## Deployment and recovery notes

This repository is configured for static Astro output. Its deployment provider
and GitHub OAuth bridge are external to the repository, so retain access to both
their dashboards alongside GitHub organisation ownership.
