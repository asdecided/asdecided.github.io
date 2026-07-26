import { DecisionConsole } from "./DecisionConsole";
import { BrandHero } from "./BrandHero";

const repositories = [
  {
    name: "Core",
    status: "Available",
    description: "Native CLI and read-only MCP.",
    href: "https://github.com/asdecided/core",
  },
  {
    name: "Specification",
    status: "Open contract",
    description: "The language-neutral contract.",
    href: "https://github.com/asdecided/spec",
  },
  {
    name: "CI",
    status: "Available",
    description: "Decision-aware merge gates.",
    href: "https://github.com/asdecided/ci",
  },
  {
    name: "Connectors",
    status: "Pre-release",
    description: "Explicit inbound bridges.",
    href: "https://github.com/asdecided/connectors",
  },
  {
    name: "Proofkeeper",
    status: "Available",
    description: "Requirements turned into tests.",
    href: "https://github.com/asdecided/proofkeeper",
  },
  {
    name: "Benchmarks",
    status: "Measured",
    description: "Evidence without an LLM judge.",
    href: "https://github.com/asdecided/benchmarks",
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function Home() {
  return (
    <main>
      <BrandHero />

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
            Keep decisions as validated Markdown. Serve them read-only to every
            coding agent.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#install">
              Install the native core <span aria-hidden="true">↓</span>
            </a>
          </div>
          </div>
        </div>
      </section>

      <section className="console-section" aria-labelledby="console-title">
        <div className="section-heading">
          <p className="eyebrow">The signature interaction</p>
          <h2 id="console-title">Ask the repository, not another model.</h2>
          <p>
            No embeddings. No model call. The same query returns the same cited
            decision.
          </p>
        </div>
        <DecisionConsole />
      </section>

      <section className="install-section" id="install" aria-labelledby="install-title">
        <div className="install-copy">
          <p className="eyebrow">Five-minute start</p>
          <h2 id="install-title">Put one real decision on the record.</h2>
          <p>
            Install Core. Create an artifact. Validate it.
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

      <section className="ecosystem-section" id="ecosystem" aria-labelledby="ecosystem-title">
        <div className="ecosystem-heading">
          <div>
            <p className="eyebrow">The public system</p>
            <h2 id="ecosystem-title">One boundary per repository.</h2>
          </div>
          <p>
            Core runs it. Companions own CI, integrations, and evidence.
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
        <h2>Decide once. Let every agent inherit it.</h2>
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
