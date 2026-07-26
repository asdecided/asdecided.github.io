import { DecisionConsole } from "./DecisionConsole";

const repositories = [
  {
    name: "Core",
    status: "Available",
    description: "The native Rust CLI and read-only MCP server.",
    href: "https://github.com/asdecided/core",
  },
  {
    name: "Specification",
    status: "Open contract",
    description: "The language-neutral RAC schemas and conformance fixtures.",
    href: "https://github.com/asdecided/spec",
  },
  {
    name: "CI",
    status: "Available",
    description: "GitHub Actions that make the record part of the merge gate.",
    href: "https://github.com/asdecided/ci",
  },
  {
    name: "Connectors",
    status: "Pre-release",
    description: "Explicit bridges from external systems into the decision record.",
    href: "https://github.com/asdecided/connectors",
  },
  {
    name: "Proofkeeper",
    status: "Available",
    description: "Turns a recorded capability into a test that can be run again.",
    href: "https://github.com/asdecided/proofkeeper",
  },
  {
    name: "Benchmarks",
    status: "Measured",
    description: "Deterministic evaluation without an LLM judge.",
    href: "https://github.com/asdecided/benchmarks",
  },
];

const principles = [
  {
    number: "01",
    title: "Record",
    copy: "Requirements, decisions, designs, roadmaps, and prompts stay as typed Markdown beside the code they govern.",
  },
  {
    number: "02",
    title: "Reject",
    copy: "The native engine catches malformed artifacts, broken relationships, and retired decisions before they land.",
  },
  {
    number: "03",
    title: "Ground",
    copy: "Coding agents query a read-only MCP server and cite the current record by stable artifact ID.",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <section className="brand-hero" id="top" aria-labelledby="brand-tagline">
        <img
          className="brand-eyes"
          src="/brand-mark.jpg"
          alt="AsDecided stepped yellow eyes"
          width="720"
          height="280"
        />
        <p className="brand-tagline" id="brand-tagline">
          Build, as decided<span>.</span>
        </p>
        <a className="scroll-cue" href="#introduction" aria-label="Discover AsDecided">
          <span>Scroll to inspect</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="intro-section" id="introduction" aria-labelledby="intro-title">
        <div className="intro-index">
          <span>AS DECIDED / 001</span>
          <span>LOCAL DECISION INFRASTRUCTURE</span>
        </div>
        <div className="intro-grid">
          <div>
          <p className="eyebrow">
            <span className="signal" aria-hidden="true" />
            The product
          </p>
          <h1 id="intro-title">
            Your agents can move fast
            <span>without rewriting the past.</span>
          </h1>
          </div>
          <div className="intro-detail">
          <p className="hero-intro">
            AsDecided keeps the product decisions behind your code in a typed,
            validated record your coding agents can actually follow.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#install">
              Install the native core <span aria-hidden="true">↓</span>
            </a>
            <a
              className="text-link"
              href="https://github.com/asdecided/core/blob/main/docs/quickstart.md"
            >
              Read the quickstart <Arrow />
            </a>
          </div>
          <dl className="hero-facts" aria-label="Product properties">
            <div>
              <dt>Runtime</dt>
              <dd>Native Rust</dd>
            </div>
            <div>
              <dt>Retrieval</dt>
              <dd>Deterministic</dd>
            </div>
            <div>
              <dt>Storage</dt>
              <dd>Markdown + Git</dd>
            </div>
          </dl>
          </div>
        </div>
      </section>

      <section className="console-section" aria-labelledby="console-title">
        <div className="section-heading">
          <p className="eyebrow">The signature interaction</p>
          <h2 id="console-title">Ask the repository, not another model.</h2>
          <p>
            Retrieval makes no model call and uses no embeddings. The same
            record and query produce the same cited result.
          </p>
        </div>
        <DecisionConsole />
      </section>

      <section className="method-section" id="method" aria-labelledby="method-title">
        <div className="section-kicker">
          <p>THE METHOD</p>
          <span>Three moves. One governed record.</span>
        </div>
        <h2 id="method-title">Decisions become infrastructure.</h2>
        <div className="principle-list">
          {principles.map((principle) => (
            <article key={principle.number} className="principle">
              <span className="principle-number">{principle.number}</span>
              <h3>{principle.title}</h3>
              <p>{principle.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="install-section" id="install" aria-labelledby="install-title">
        <div className="install-copy">
          <p className="eyebrow">Five-minute start</p>
          <h2 id="install-title">Put one real decision on the record.</h2>
          <p>
            Install the native engine and MCP server, scaffold a first artifact,
            then validate it before connecting an agent.
          </p>
          <a
            className="text-link"
            href="https://github.com/asdecided/core/blob/main/docs/quickstart.md"
          >
            Follow the complete quickstart <Arrow />
          </a>
        </div>
        <div className="terminal" aria-label="Installation commands">
          <div className="terminal-bar">
            <span>TERMINAL / YOUR REPOSITORY</span>
            <span>LOCAL</span>
          </div>
          <ol>
            <li>
              <span className="line-number">01</span>
              <code>brew install asdecided/tap/asdecided-core</code>
            </li>
            <li>
              <span className="line-number">02</span>
              <code>decided quickstart</code>
            </li>
            <li>
              <span className="line-number">03</span>
              <code>decided validate decisions/</code>
            </li>
          </ol>
          <div className="terminal-result">
            <span aria-hidden="true">✓</span>
            <span>Record valid. Ready for review.</span>
          </div>
        </div>
      </section>

      <section className="boundary-section" aria-labelledby="boundary-title">
        <div className="section-heading">
          <p className="eyebrow">A deliberately narrow trust boundary</p>
          <h2 id="boundary-title">Your agent can read the record. It cannot rewrite it.</h2>
        </div>
        <div className="boundary-grid">
          <div className="boundary-side boundary-agent">
            <span className="boundary-label">AGENT SIDE</span>
            <h3>Search. Retrieve. Cite.</h3>
            <p>
              The MCP surface is read-only. Agents get grounded context without
              gaining a hidden write path into your decisions.
            </p>
          </div>
          <div className="boundary-line" aria-hidden="true">
            <span>READ ONLY</span>
          </div>
          <div className="boundary-side boundary-human">
            <span className="boundary-label">HUMAN SIDE</span>
            <h3>Edit. Review. Merge.</h3>
            <p>
              Decisions change through ordinary files and pull requests, with
              validation and history visible to the team.
            </p>
          </div>
        </div>
      </section>

      <section className="ecosystem-section" id="ecosystem" aria-labelledby="ecosystem-title">
        <div className="ecosystem-heading">
          <div>
            <p className="eyebrow">The public system</p>
            <h2 id="ecosystem-title">Small repositories. Explicit responsibilities.</h2>
          </div>
          <p>
            Core is the runtime. Everything else owns one boundary around it.
            Status is stated plainly while the ecosystem is still taking shape.
          </p>
        </div>
        <div className="repository-list">
          {repositories.map((repository) => (
            <a href={repository.href} key={repository.name} className="repository-row">
              <span className="repository-name">{repository.name}</span>
              <span className="repository-description">{repository.description}</span>
              <span className="repository-status">{repository.status}</span>
              <Arrow />
            </a>
          ))}
        </div>
      </section>

      <section className="closing-section">
        <p className="closing-index">AS DECIDED / 001</p>
        <h2>Make the decision once. Let every agent inherit it.</h2>
        <div className="closing-actions">
          <a className="button button-primary" href="#install">
            Start with Core
          </a>
          <a className="button button-secondary" href="https://github.com/asdecided">
            Explore the organization <Arrow />
          </a>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <img src="/favicon.png" alt="" width="28" height="28" />
          <span>AsDecided</span>
        </div>
        <p>Engineering decisions your agents can follow. Build, as decided.</p>
        <div className="footer-links">
          <a href="https://github.com/asdecided/core">Core</a>
          <a href="https://github.com/asdecided/spec">Spec</a>
          <a href="https://github.com/asdecided">GitHub</a>
        </div>
      </footer>
    </main>
  );
}
