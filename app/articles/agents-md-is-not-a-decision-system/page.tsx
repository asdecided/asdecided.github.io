import type { Metadata } from "next";
import Link from "next/link";
import "../article.css";

const canonical = "https://asdecided.com/articles/agents-md-is-not-a-decision-system";

export const metadata: Metadata = {
  title: "AGENTS.md Is Not a Decision System",
  description:
    "AGENTS.md gives coding agents repository context, but governing technical decisions requires a system that records, routes, and enforces them.",
  alternates: { canonical },
  openGraph: {
    type: "article",
    url: canonical,
    title: "AGENTS.md Is Not a Decision System",
    description:
      "Repository instructions provide context. Decision governance requires Record → Route → Enforce.",
    publishedTime: "2026-08-03T00:00:00.000Z",
    modifiedTime: "2026-08-03T00:00:00.000Z",
    authors: ["https://tcballard.dev"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AGENTS.md Is Not a Decision System",
    description:
      "Repository instructions provide context. Decision governance requires Record → Route → Enforce.",
  },
};

const sources = [
  ["GitHub repository instructions", "https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions"],
  ["Architecture decision record", "https://github.com/joelparkerhenderson/architecture-decision-record"],
  ["Vibe Architecting", "https://arxiv.org/abs/2604.04990"],
  ["Configuration Smells in Agent Context Files", "https://arxiv.org/abs/2606.15828"],
  ["Persistent Context Files and Coding Agent Correctness", "https://arxiv.org/abs/2607.27250"],
  ["Context Selection for ADR Generation", "https://arxiv.org/abs/2604.03826"],
  ["Detecting Architectural Decision Violations", "https://arxiv.org/abs/2602.07609"],
] as const;

export default function Article() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "AGENTS.md Is Not a Decision System",
    description:
      "AGENTS.md gives coding agents repository context, but governing technical decisions requires a system that records, routes, and enforces them.",
    datePublished: "2026-08-03",
    dateModified: "2026-08-03",
    author: { "@type": "Person", name: "Tom Ballard", url: "https://tcballard.dev/" },
    publisher: { "@type": "Organization", name: "AsDecided", url: "https://asdecided.com/" },
    mainEntityOfPage: canonical,
  };

  return (
    <main className="article-shell">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <nav className="article-nav" aria-label="Article navigation">
        <Link href="/">AsDecided</Link>
        <span>Article / 001</span>
      </nav>

      <article className="article-page">
        <header className="article-header">
          <p className="article-kicker">Agent governance</p>
          <h1><code>AGENTS.md</code> is not a decision system</h1>
          <p className="article-dek">
            Repository instruction files are useful context for coding agents. They are not, by themselves, a reliable way to govern technical decisions.
          </p>
          <div className="article-meta"><span>Tom Ballard</span><span>3 August 2026</span><span>Checked 3 August 2026</span></div>
        </header>

        <section className="article-answer">
          <p>
            An <code>AGENTS.md</code> file can tell an agent how a repository is organised, which commands to run, and which conventions to follow. It does not reliably determine which prior decisions apply to a change, whether those decisions remain current, or whether the implementation complied with them.
          </p>
          <p>A practical decision system needs three separate capabilities:</p>
          <ol><li><strong>Record</strong> what was decided and why.</li><li><strong>Route</strong> the relevant decisions into the work where they apply.</li><li><strong>Enforce</strong> the decisions that can be checked mechanically.</li></ol>
          <p><code>AGENTS.md</code> helps with context. It does not complete that loop.</p>
        </section>

        <section><h2>What <code>AGENTS.md</code> does well</h2><p>Coding agents need repository-specific context: ownership, structure, authoritative tests, generated-code boundaries, preferred libraries, and completion criteria. GitHub supports repository-wide, path-specific, and nested instruction files so guidance can apply at different scopes.</p><pre><code>{`# Repository instructions

- Run \`cargo test --workspace\` before completing a change.
- Do not edit files under \`generated/\`.
- Use SQLite for local persistence.
- Keep HTTP handlers thin.
- Place domain logic in \`src/core/\`.`}</code></pre><p>That is better than no guidance. The mistake is treating the file as the complete governance mechanism.</p></section>

        <section><h2>Instructions and decisions are different things</h2><p>An instruction tells an agent what to do. A decision explains a deliberate choice, including the context that caused it, the alternatives rejected, its scope, and its consequences.</p><blockquote>Use SQLite for local persistence.</blockquote><p>That sentence does not explain why SQLite was selected, whether it applies to every storage layer, whether PostgreSQL remains permitted on the server, or what would justify revisiting the choice. An architecture decision record preserves that missing context.</p></section>

        <section><h2>ADRs solve recording, not delivery</h2><p>A decision can exist in a repository and still have no effect on the work. A developer or agent must know it exists, recognise that it applies, find it, interpret it, implement consistently, and verify compliance.</p><p>Coding agents can select dependencies, scaffold frameworks, create storage layers, wire services, and introduce orchestration patterns within one task. Those are architectural choices even when nobody labels them as such. A folder full of ADRs cannot govern those choices unless applicable records are deliberately brought into the task.</p></section>

        <section><h2>Making <code>AGENTS.md</code> longer is not the answer</h2><p>Copying every important decision into one file works briefly. Then it accumulates architecture choices, test procedures, release rules, security policies, exceptions, and instructions for unrelated subsystems.</p><p>Recent studies of agent context files report context bloat, conflicting guidance, and instructions that would be better enforced by tools. More context is not automatically better context. The goal is the <strong>smallest relevant set of instructions and decisions for the current change</strong>.</p></section>

        <section><h2>A decision system needs three layers</h2><div className="article-model"><span>Record</span><b>→</b><span>Route</span><b>→</b><span>Enforce</span></div></section>

        <section><h2>1. Record</h2><p>The record preserves the decision, its status, context, scope, consequences, alternatives, revisit conditions, and anything it supersedes.</p><pre><code>{`id: DEC-014
title: Use SQLite for desktop workspace state
status: accepted

scope:
  paths:
    - apps/desktop/**
    - packages/local-store/**

decision:
  local_persistence: sqlite

excludes:
  - services/api/**

revisit_when:
  - desktop workspaces require concurrent multi-user writes`}</code></pre><p>Prose explains the reasoning. Structured fields make the decision easier to route and inspect.</p></section>

        <section><h2>2. Route</h2><p>Routing determines which decisions matter to the current work. A task changing desktop persistence should receive the SQLite decision. A task changing hosted account storage should not receive it merely because the repository contains a general persistence statement.</p><pre><code>{`task:
  files:
    - apps/desktop/src/storage/workspace.ts

applicable_decisions:
  - DEC-014
  - DEC-021
  - DEC-033`}</code></pre><p>This is more useful than loading every repository decision into every task. Routing is the missing link between recording a decision and using it.</p></section>

        <section><h2>3. Enforce</h2><p>Some decisions should remain explanatory. Others can become dependency rules, architecture tests, linter configuration, schema validation, policy-as-code, CI checks, forbidden-import rules, migration tests, or API compatibility gates.</p><p>The objective is not to turn every ADR into code. It is to <strong>enforce mechanically what can be established mechanically, and preserve visible human judgement for everything else</strong>.</p></section>

        <section><h2>Where <code>AGENTS.md</code> belongs</h2><ul><li><code>AGENTS.md</code> explains <strong>how the agent should work</strong>.</li><li>Decision records explain <strong>what the team decided and why</strong>.</li><li>Routing determines <strong>which decisions matter now</strong>.</li><li>Enforcement determines <strong>whether the result complies</strong>.</li></ul><p>These artifacts complement one another. They should not be collapsed into one increasingly large instruction file.</p></section>

        <section><h2>A worked repository example</h2><p>Suppose an agent is asked to add cloud synchronisation to desktop workspaces. The relevant decisions cover local SQLite state, hosted PostgreSQL, offline-first behaviour, explicit conflict resolution, and idempotent background jobs.</p><p>A decision-aware workflow routes those five decisions into the implementation brief, then checks the result through dependency validation, migration tests, offline integration tests, conflict tests, idempotency tests, and human review of the user experience.</p><p>The decisions are no longer passive documents. They participate in planning, implementation, and review.</p></section>

        <section><h2>The practical model</h2><p>Use <code>AGENTS.md</code> for stable working instructions. Use decision records for meaningful choices and rationale. Add explicit scope. Route only applicable decisions into each agent session. Turn enforceable decisions into deterministic checks. Keep human review for contextual or organisational decisions.</p></section>

        <section className="article-conclusion"><h2>Conclusion</h2><p><code>AGENTS.md</code> is a useful repository interface for coding agents. It is not a decision system.</p><p>A decision system must preserve why a choice was made, identify where it applies, bring it into the relevant task, and verify compliance where possible.</p><div className="article-model vertical"><span>Record the decision.</span><span>Route it to the work.</span><span>Enforce what can be checked.</span></div><p>Without recording, decisions disappear. Without routing, they are ignored. Without enforcement, they remain suggestions.</p></section>

        <section className="article-sources"><h2>Sources</h2><ol>{sources.map(([label, href]) => <li key={href}><a href={href}>{label}</a></li>)}</ol></section>
      </article>
      <footer className="article-footer"><Link href="/">← Back to AsDecided</Link><span>Build, as decided.</span></footer>
    </main>
  );
}
