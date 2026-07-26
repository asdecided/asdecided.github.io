# Ecosystem

Core is the runtime. Each companion owns one explicit boundary.

| Repository | Responsibility | Status |
|---|---|---|
| [`core`](https://github.com/asdecided/core) | native CLI and read-only MCP server | available |
| [`spec`](https://github.com/asdecided/spec) | language-neutral RAC contract | pre-1.0 |
| [`ci`](https://github.com/asdecided/ci) | GitHub merge gates | available |
| [`connectors`](https://github.com/asdecided/connectors) | external-system bridges | pre-release |
| [`proofkeeper`](https://github.com/asdecided/proofkeeper) | requirements-to-test workflow | available |
| [`benchmarks`](https://github.com/asdecided/benchmarks) | deterministic evaluation suites | active |
| [`sdk`](https://github.com/asdecided/sdk) | language clients over stable contracts | transition |
| [`editors`](https://github.com/asdecided/editors) | editor integrations | not yet installable |

Install the current native runtime with:

```sh
brew install asdecided/tap/asdecided-core
```
