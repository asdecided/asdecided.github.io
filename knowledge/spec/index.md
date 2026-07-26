# Specification map

RAC—Requirements as Code—is the language-neutral contract beneath AsDecided.

The contract is pre-1.0 and maintained in
[`asdecided/spec`](https://github.com/asdecided/spec). This knowledge base
vendors the released text at build time so the searchable copy stays attached
to its authoritative source.

## Normative material

| Surface | Defines |
|---|---|
| [RAC specification](../vendor/spec/SPEC.md) | artifact model, identity, lifecycle, relationships, validation, compatibility |
| [Status vocabulary](../vendor/spec/vocabulary/status.md) | closed lifecycle values and semantics |
| [Relationship vocabulary](../vendor/spec/vocabulary/relationships.md) | allowed typed edges |
| [Conformance](../vendor/spec/conformance/conformance.md) | levels, fixtures, and parity expectations |
| [Schemas](schemas.md) | machine-readable artifact and frontmatter contracts |

## Implementation boundary

The specification does not require Rust, MCP, or the AsDecided CLI.
[`asdecided/core`](https://github.com/asdecided/core) is the reference
implementation, not the definition of the format.
