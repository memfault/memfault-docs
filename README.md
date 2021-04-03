[![Netlify Status](https://api.netlify.com/api/v1/badges/53e9bd12-7f75-468c-ab7f-eb4b70d10e07/deploy-status)](https://app.netlify.com/sites/memfault-docs/deploys)
[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/memfault/memfault-docs)

# Memfault Docusaurus

_Docs are auto-deployed when you commit to master (merge a PR!)_ If the deploy fails, netlify will roll back to the previous version

![static/img/memfault-docusaurus.png](static/img/memfault-docusaurus.png)

Our docs are built using [Docusaurus 2](https://v2.docusaurus.io/), a static
website generator.

## Development

Install dependencies:

```
$ yarn
```

Start a local webserver that will pick up most changes without restarting:

```
$ yarn start
```

## Linter

Code is linted with prettier. To fix up files to match format, run:

```
$ ./node_modules/.bin/prettier --write path/to/file.mdx
```

## Content

Add a new page to the docs:

1. Choose a subdirectory under `docs/` and insert your Markdown file. Copy the
   header from an existing page and give it a unique title and `id:`.

2. Place any images needed by the page in the matching subdirectory under
   `static/img/docs/`.

3. Add the new page to `sidebars.js`.

Add a new post to the changelog:

1. Create a new post under `blog/` using the existing filename conventions. Copy
   the header from an existing post and give it a nice title.

2. Place any images needed by thte post in `static/img/blog/`.
