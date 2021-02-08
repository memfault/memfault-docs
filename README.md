# Memfault Docusaurus

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
$ inv docs.start
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

## Deployment

We also use Invoke to deploy our documentation.

### Netlify Setup

The first thing you need to do is to login to Netlify in the CLI so that we can
push the site.

```
# Login to Netlify (will generate a ~/.netlify/config.json file)
$ yarn netlify login
```

### Deploy the docs

This will build and publish the documentation to Netlify.

```
$ inv docs.publish
```

> If you don't see it update automatically, you may need to navigate to
> https://app.netlify.com/sites/memfault-docs/deploys and manually click
> "Deploy" to actually publish the changes.
