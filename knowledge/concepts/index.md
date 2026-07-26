# Knowledge model

AsDecided turns product knowledge into a small, enforceable graph.

## Five artifact types

- **Requirement** — the problem, required behavior, and success measure.
- **Decision** — a choice, its context, and consequences.
- **Design** — the implementation shape that realizes requirements and decisions.
- **Roadmap** — sequenced delivery intent.
- **Prompt** — durable instructions an agent should inherit.

Each artifact has stable identity, a lifecycle, type-specific sections, and
typed relationships.

## Identity survives refactoring

An artifact ID remains stable when its file moves or is renamed. Paths organize
the repository; IDs carry meaning across time.

## Lifecycle is closed

Status is not free-form metadata. The specification defines the allowed states
and the rules for supersession, so consumers can distinguish current knowledge
from history.

## Relationships are checked

Links such as `related decisions`, `related requirements`, and `supersedes`
form a typed graph. Validation catches missing targets, invalid edge types,
self-reference, and supersession cycles.

## Retrieval is deterministic

Core uses no embeddings and makes no model call to retrieve the record. The same
corpus and query produce the same ordered result.

Next: [Artifact types](../vendor/core/artifacts.md) ·
[Relationships](../vendor/core/relationships.md) ·
[Normative specification](../vendor/spec/SPEC.md)
