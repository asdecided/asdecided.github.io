# Start here

AsDecided is a local system of record for the product knowledge behind your
code.

Requirements, decisions, designs, roadmaps, and prompts live as typed Markdown
in Git. The native engine validates the record before it lands. A read-only MCP
server lets coding agents search, retrieve, relate, and cite that record.

## The shortest useful path

1. [Install Core and create one artifact](vendor/core/quickstart.md).
2. Run `decided validate decisions/`.
3. [Connect your coding agent](vendor/core/mcp.md).
4. Ask a question already covered by the record.
5. Add [decision-aware pull-request checks](vendor/core/decisions-on-pr.md).

## Choose what you need

| If you want to… | Go to… |
|---|---|
| understand the artifact model | [Concepts](concepts/index.md) |
| adopt AsDecided in a repository | [Repository workflow](vendor/core/repo-workflow.md) |
| implement the format yourself | [Specification](spec/index.md) |
| find a command or exit contract | [CLI reference](vendor/core/cli.md) |
| operate it across a team | [How-to guides](how-to/index.md) |

## The trust boundary

Agents can read the record through MCP. They cannot mutate it. Decisions change
through ordinary files, review, and merge.
