---
title: AGENTS.md Is Not a Decision System
description: AGENTS.md gives coding agents repository context, but governing technical decisions requires a system that records, routes, and enforces them.
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "AGENTS.md Is Not a Decision System",
  "description": "AGENTS.md gives coding agents repository context, but governing technical decisions requires a system that records, routes, and enforces them.",
  "datePublished": "2026-08-03",
  "dateModified": "2026-08-03",
  "author": {
    "@type": "Person",
    "name": "Tom Ballard",
    "url": "https://tcballard.dev/"
  },
  "publisher": {
    "@type": "Organization",
    "name": "AsDecided",
    "url": "https://asdecided.com/"
  },
  "mainEntityOfPage": "https://docs.asdecided.com/articles/agents-md-is-not-a-decision-system/"
}
</script>

# `AGENTS.md` is not a decision system

Repository instruction files are useful context for coding agents. They are not, by themselves, a reliable way to govern technical decisions.

An `AGENTS.md` file can tell an agent how a repository is organised, which commands to run, and which conventions to follow. But it does not reliably determine which prior decisions apply to a particular change, whether those decisions remain current, or whether the resulting implementation complied with them.

A practical decision system needs three separate capabilities:

1. **Record** what was decided and why.
2. **Route** the relevant decisions into the work where they apply.
3. **Enforce** the decisions that can be checked mechanically.

`AGENTS.md` helps with context. It does not complete that loop.

## What `AGENTS.md` does well

Coding agents need repository-specific context. Without it, an agent may not know:

- which package owns a feature;
- how the repository is structured;
- which test commands are authoritative;
- which libraries or frameworks the team prefers;
- which directories contain generated code;
- what must be verified before work is complete.

An `AGENTS.md` file gives teams a persistent place to supply that information. GitHub's coding-agent guidance likewise supports repository-wide, path-specific, and nested instruction files so guidance can be applied at different scopes.[^github-instructions]

```markdown
# Repository instructions

- Run `cargo test --workspace` before completing a change.
- Do not edit files under `generated/`.
- Use SQLite for local persistence.
- Keep HTTP handlers thin.
- Place domain logic in `src/core/`.
```

For many tasks, that is substantially better than giving the agent no repository guidance. The mistake is treating the file as the complete governance mechanism.

## Instructions and decisions are different things

An instruction tells an agent what to do. A decision explains a deliberate choice, including the context that caused it, the alternatives rejected, its scope, and its consequences.

Consider the instruction:

> Use SQLite for local persistence.

It does not tell the agent why SQLite was selected, whether the choice applies to every storage layer, whether PostgreSQL is still permitted on the server, which conditions would justify revisiting the choice, or which later decision may have superseded it.

An architecture decision record is designed to preserve this missing context. A commonly used ADR structure records the decision's status, context, chosen action, and consequences.[^adr]

```markdown
# Use SQLite for desktop workspace state

## Status

Accepted

## Context

The desktop application must work without a network connection.
Workspace state is local to one user and does not require concurrent
multi-host writes.

## Decision

Use SQLite for persistent desktop workspace state.

This applies to `apps/desktop/**` and `packages/local-store/**`.
It does not govern hosted service persistence.

## Consequences

The desktop application requires no external database service.
Features requiring multi-user concurrent writes must remain in hosted
services or trigger a new decision.
```

That record is more useful because it preserves the boundary of the decision. But ADRs alone still do not solve the whole problem.

## ADRs solve recording, not delivery

A decision can exist in a repository and still have no effect on the work.

The developer or agent must know that the decision exists, recognise that it applies, find it, interpret it correctly, implement consistently, and verify compliance. Repositories commonly stop after the first step: the decision was written down.

The problem becomes more pronounced with coding agents. Agents can select dependencies, scaffold frameworks, create storage layers, wire external services, and introduce orchestration patterns within one task. Those are architectural choices even when nobody explicitly labels them as such.

Recent research describes this as **vibe architecting**: architectural structure emerging from prompt wording and agent choices rather than an explicit design process. Different prompts can produce structurally different systems for the same stated task.[^vibe-architecting]

A folder full of ADRs cannot govern those choices unless applicable records are deliberately brought into the task.

## Making `AGENTS.md` longer is not the answer

The obvious response is to copy every important decision into `AGENTS.md`. That works for a while. Then the file accumulates architecture choices, test procedures, release rules, design guidance, deployment constraints, security policies, exceptions, and instructions for unrelated subsystems.

Eventually every task receives a large body of context, much of which is irrelevant to the files being changed.

A 2026 study of popular repositories containing `AGENTS.md` or `CLAUDE.md` files found configuration problems including context bloat, instructions better handled by tools, and conflicting guidance.[^agent-smells] Another controlled study across Claude Code and Codex found that persistent context files did not measurably improve correctness across the tested tasks; many failures came from implementation and pattern-selection weaknesses rather than missing repository facts.[^persistent-context]

That does not make context files useless. It means teams should not expect one large Markdown file to compensate for weaknesses in planning, retrieval, implementation, and verification.

The goal should be to provide the **smallest relevant set of instructions and decisions for the current change**.

## A decision system needs three layers

```text
Record → Route → Enforce
```

Each layer solves a different problem.

## 1. Record

The record preserves the decision. At minimum, it should identify:

- the decision and its status;
- the context that caused it;
- the scope where it applies;
- its consequences and relevant alternatives;
- what would cause it to be revisited;
- any decision it supersedes.

The record should be stable enough to explain the decision later while remaining explicit about lifecycle changes.

```yaml
id: DEC-014
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
  - services/worker/**

revisit_when:
  - desktop workspaces require concurrent multi-user writes
  - state must be shared across devices in real time
```

The prose record explains the reasoning. Structured fields make the decision easier to route and inspect.

## 2. Route

Routing determines which decisions matter to the current work.

A task changing `apps/desktop/src/storage/workspace.ts` should receive the SQLite decision. A task changing `services/api/src/persistence/accounts.ts` should not receive it merely because the repository contains a general statement about persistence.

Routing can use changed file paths, affected components, dependency boundaries, task metadata, repository ownership, referenced APIs, or explicit relationships between decisions.

```yaml
task:
  files:
    - apps/desktop/src/storage/workspace.ts

applicable_decisions:
  - DEC-014
  - DEC-021
  - DEC-033
```

The agent can then receive a focused brief:

```markdown
## Applicable decisions

### DEC-014: Use SQLite for desktop workspace state

This change touches desktop persistence. Do not introduce another
database client. Hosted service persistence is outside this decision.

### DEC-021: Keep migrations reversible

Every schema migration must define a tested rollback path.
```

This is more useful than loading every repository decision into every task. Research on context selection for ADR generation supports the same broad principle: context quality matters more than context quantity, with targeted retrieval becoming more useful for cross-cutting cases.[^adr-context]

Routing is the missing link between recording a decision and using it.

## 3. Enforce

Some decisions should remain explanatory. Others can and should become executable checks.

The SQLite decision could be enforced by rejecting unsupported database dependencies in governed paths:

```python
from pathlib import Path

FORBIDDEN = {"psycopg", "asyncpg", "pymysql", "pymongo"}
requirements = Path("apps/desktop/requirements.txt").read_text()
violations = [name for name in FORBIDDEN if name in requirements]

if violations:
    raise SystemExit(
        "DEC-014 violation: desktop persistence must use SQLite. "
        f"Found: {', '.join(violations)}"
    )
```

Other decisions may become dependency rules, architecture tests, linter configuration, schema validation, policy-as-code, CI checks, forbidden import rules, migration tests, or API compatibility gates.

This does not mean every decision should become a test. A decision such as “prefer a calm, low-distraction interface for operational workflows” requires judgement. A decision such as “code under `domain/` must not import from `infrastructure/`” is directly enforceable.

Research into automated detection of architectural decision violations similarly finds that explicit, code-inferable decisions are easier to evaluate than implicit or organisational decisions dependent on deployment or human knowledge.[^decision-violations]

The objective is not to turn every ADR into code. It is to **enforce mechanically what can be established mechanically, and preserve visible human judgement for everything else**.

## Where `AGENTS.md` belongs

`AGENTS.md` still has an important role. It should contain durable operating instructions that apply broadly within its scope:

```markdown
# Agent instructions

## Before editing

- Read the applicable decision brief generated for this task.
- Inspect existing patterns before adding new abstractions.

## Validation

- Run `cargo test --workspace`.
- Run `python3 scripts/check-decisions.py --changed-files`.
- Do not claim completion if an applicable decision is unresolved.

## Repository boundaries

- Do not edit generated files.
- Keep domain code independent from infrastructure adapters.
```

The distinction is straightforward:

- `AGENTS.md` explains **how the agent should work**.
- Decision records explain **what the team decided and why**.
- Routing determines **which decisions matter now**.
- Enforcement determines **whether the result complies**.

These artifacts complement one another. They should not be collapsed into one increasingly large instruction file.

## A worked repository example

Suppose an agent is asked to add cloud synchronisation to desktop workspaces. The repository contains these decisions:

```text
DEC-014 — Use SQLite for desktop workspace state
DEC-018 — Hosted services use PostgreSQL
DEC-027 — Sync operations must be offline-first
DEC-031 — Conflicts require explicit user resolution
DEC-042 — Background jobs must be idempotent
```

A weak workflow sends the task and the whole repository to the agent. A better workflow evaluates the affected areas:

```text
apps/desktop/**
services/sync/**
packages/protocol/**
```

It routes the five applicable decisions and turns them into an implementation brief:

```markdown
Desktop state remains in SQLite.

The hosted synchronisation service may use PostgreSQL.

The client must continue accepting local writes while offline.

Conflicting updates must not be resolved silently.

Retrying a synchronisation job must not duplicate effects.
```

The resulting change is checked through dependency validation, database migration tests, an offline integration test, conflict-resolution tests, idempotency tests, and human review of the user-facing conflict experience.

The decisions are no longer passive documents. They participate in planning, implementation, and review.

## What this changes for agent governance

Teams often frame coding-agent governance as a permissions problem:

- Which commands can the agent run?
- Can it access the network?
- Can it merge a pull request?
- Can it modify production infrastructure?

Those controls matter, but they govern **what the agent is allowed to do**.

Decision governance addresses a separate question:

> How does the agent know which technical choices have already been made, where they apply, and whether its implementation contradicts them?

A sandbox cannot answer that. A longer prompt cannot answer it reliably. A folder of unread ADRs cannot answer it.

The answer is a system that delivers relevant decisions into the work and checks the result where possible.

## The practical model

Use `AGENTS.md` for stable working instructions.

Use decision records for meaningful choices and their rationale.

Add explicit scope so decisions can be matched to code, components, and tasks.

Route only applicable decisions into each agent session.

Turn enforceable decisions into deterministic checks.

Require human review for decisions that remain contextual, experiential, or organisational.

The result is not an agent that blindly follows a bigger prompt. It is a development process in which decisions remain connected to the work they govern.

## Conclusion

`AGENTS.md` is a useful repository interface for coding agents. It can explain how to build, test, and navigate a codebase. It can reinforce local conventions and point the agent towards the right tools.

It is not a decision system.

A decision system must preserve why a choice was made, identify where that choice applies, bring it into the relevant task, and verify compliance where verification is possible.

```text
Record the decision.
Route it to the work.
Enforce what can be checked.
```

Without recording, decisions disappear. Without routing, they are ignored. Without enforcement, they remain suggestions.

---

*Published and checked on 3 August 2026.*

[^github-instructions]: [Adding repository custom instructions for GitHub Copilot](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions/add-repository-instructions), GitHub Docs.
[^adr]: [Architecture decision record](https://github.com/joelparkerhenderson/architecture-decision-record), Joel Parker Henderson.
[^vibe-architecting]: [Vibe Architecting: Exploring the Impact of Prompting on Software Architecture in Agentic Coding](https://arxiv.org/abs/2604.04990), arXiv, 2026.
[^agent-smells]: [Configuration Smells in Agent Context Files](https://arxiv.org/abs/2606.15828), arXiv, 2026.
[^persistent-context]: [Do Persistent Context Files Improve Coding Agent Correctness?](https://arxiv.org/abs/2607.27250), arXiv, 2026.
[^adr-context]: [Context Selection for Automated Architecture Decision Record Generation](https://arxiv.org/abs/2604.03826), arXiv, 2026.
[^decision-violations]: [Detecting Architectural Decision Violations with Large Language Models](https://arxiv.org/abs/2602.07609), arXiv, 2026.
