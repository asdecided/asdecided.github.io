# AsDecided on the web

AsDecided has one canonical public origin with two complementary surfaces:

- [asdecided.com](https://asdecided.com/) is the product site, canonical answer layer, Notes and release record. It is deployed through ChatGPT Sites.
- [asdecided.com/docs](https://asdecided.com/docs/) is the searchable knowledge base for the specification, concepts, guides and reference material. Its source remains in this repository and the generated build is published through the product site.

Use the [canonical source map](https://asdecided.com/sources) to match product claims to the specification, documentation, implementation or dated release evidence that governs them.

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

Pull requests build the knowledge base in strict mode. Merges to `main` also
publish the generated bundle to GitHub Pages as a transitional mirror whose
canonical URLs point to `asdecided.com/docs/`.
