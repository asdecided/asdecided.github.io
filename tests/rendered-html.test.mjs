import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the AsDecided product site", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>AsDecided — Engineering decisions your agents can follow<\/title>/i,
  );
  assert.match(html, /Your agents can move fast/);
  assert.match(html, /without rewriting the past/);
  assert.match(html, /brew install asdecided\/tap\/asdecided-core/);
  assert.match(html, /Ask the repository, not another model/);
  assert.match(html, /A deliberately narrow trust boundary/);
  assert.match(html, /Small repositories\. Explicit responsibilities\./);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});
