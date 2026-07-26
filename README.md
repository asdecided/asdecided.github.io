# AsDecided on the web

Two public surfaces for [AsDecided](https://github.com/asdecided):

- The product site is the concise introduction to AsDecided. It is deployed
  through ChatGPT Sites.
- GitHub Pages is the searchable knowledge base for the specification,
  concepts, guides, and reference material.

## Product site

```console
npm ci
npm run dev
```

Build and verify the deployable site with:

```console
npm run build
npm test
```

## Knowledge base

The knowledge base has a small set of owned navigation pages under
`knowledge/`. Authoritative product documentation and specification material
are vendored at build time from
[`asdecided/core`](https://github.com/asdecided/core) and
[`asdecided/spec`](https://github.com/asdecided/spec), so this repository
organizes those sources without forking them.

```console
./scripts/vendor-knowledge.sh
uv run --with mkdocs==1.6.1 --with mkdocs-material==9.7.6 mkdocs serve
```

Pull requests build the knowledge base in strict mode. Merges to `main` deploy
it to GitHub Pages.
