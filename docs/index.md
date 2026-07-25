---
template: home.html
hide:
  - navigation
  - toc
---

**AsDecided** keeps a team's recorded
requirements, decisions, and designs as typed Markdown in the repo,
validates them in CI, and serves them read-only to coding agents over MCP.

```
brew install asdecided/tap/asdecided-core
```

## How it works

<div class="lore-steps" markdown="0">
  <div><span class="lore-step__num">01</span><h3>Record</h3>
    <p>Requirements, decisions, and designs live as typed Markdown in your repo,
    versioned next to the code.</p></div>
  <div><span class="lore-step__num">02</span><h3>Validate</h3>
    <p>CI rejects malformed artifacts, broken links, and references to superseded
    decisions before they land.</p></div>
  <div><span class="lore-step__num">03</span><h3>Serve</h3>
    <p>Your agent queries AsDecided over MCP and cites
    decisions by ID instead of violating them.</p></div>
</div>

> Ask your agent: *"Should I add a hard delete to the user model?"* — it calls
> Lore, finds your soft-delete decision, cites it by ID, and proposes the
> compliant change instead of reintroducing what you removed on purpose.

Serving happens over the [AsDecided MCP server](core/mcp.md); the
[`decided` CLI](core/cli.md) covers validation and inspection.

## Why it's different

<div class="lore-grid" markdown="0">
  <div class="lore-card"><h3>Deterministic, not probabilistic</h3>
    <p>Retrieval makes no model calls and uses no embeddings. The same query
    returns the same answer, every run.</p></div>
  <div class="lore-card"><h3>Read-only by design</h3>
    <p>Agents cite decisions by ID; they can never mutate the store. Changes
    land only through human-reviewed pull requests.</p></div>
  <div class="lore-card"><h3>Plain Markdown in your repo</h3>
    <p>No database, no vendor lock-in. Your knowledge is versioned next to
    your code and readable without any tool.</p></div>
  <div class="lore-card"><h3>Enforced in CI, air-gap friendly</h3>
    <p>Broken links and superseded references are rejected before they land.
    Runs fully offline — nothing leaves your machine.</p></div>
</div>

## The ecosystem

<div class="lore-grid" markdown="0">
  <div class="lore-card"><h3>Core</h3>
    <p>The native Rust engine: the decided CLI, validation gates, and the read-only MCP
    server. This is what you install.</p></div>
  <div class="lore-card"><h3>Proofkeeper</h3>
    <p>Turns each recorded capability into a re-runnable Playwright test,
    proposed back by pull request.</p></div>
  <div class="lore-card"><h3>Wayfinder</h3>
    <p>Deterministic prompt-complexity routing — a hard-or-easy call on every
    prompt, offline, no model call.</p></div>
  <div class="lore-card"><h3>SDK</h3>
    <p>Non-Python language SDKs — thin clients over the engine's stable
    <code>--json</code> contracts.</p></div>
  <div class="lore-card"><h3>Editors</h3>
    <p>IDE and editor integrations, one subdir per client.</p></div>
  <div class="lore-card"><h3>CI</h3>
    <p>The CI delivery surface — validation and gating wrappers, GitHub
    first.</p></div>
  <div class="lore-card"><h3>Benchmarks</h3>
    <p>Evaluation suites, one subdir per benchmark.</p></div>
</div>

Plus connectors and everything else — see the
[full repository map](core/ecosystem.md) or the
[AsDecided organization on GitHub](https://github.com/asdecided).

<p class="lore-footnote">RAC remains the stable artifact contract underneath.
<code>asdecided-core</code> installs the native CLI and MCP server together.</p>

<div class="lore-ctaband" markdown="0">
  <h2>Up and running in five minutes.</h2>
  <p>Install the CLI, scaffold your first artifact, connect your agent.</p>
  <nav class="lore-cta">
    <a class="lore-btn lore-btn--primary" href="core/quickstart/">Quickstart →</a>
    <a class="lore-btn" href="https://github.com/asdecided">View on GitHub</a>
  </nav>
  <p class="lore-footnote">AsDecided is open source and under active development.</p>
</div>
