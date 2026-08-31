import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import { __peekTestRenderSession } from "../src/lib/peek/render/render-session.js";

test("renders copyable part and tool call identifiers only for tool parts", async () => {
  const workspaceRoot = await mkdtemp(join(tmpdir(), "opencode-peek-identifiers-"));
  const snapshotPath = join(workspaceRoot, "snapshot.json");
  const outputPath = join(workspaceRoot, "peek.html");
  await writeFile(snapshotPath, JSON.stringify({
    sessionID: "ses_test",
    directory: workspaceRoot,
    messages: [{
      info: { id: "msg_test", role: "assistant" },
      parts: [
        { id: "prt_text", type: "text", text: "A response" },
        { id: "prt_tool", callID: "call_0123456789abcdef", type: "tool", tool: "bash", state: { status: "completed", output: "done" } },
        { id: "prt_no_call", type: "tool", tool: "read", state: { status: "completed", output: "done" } },
      ],
    }],
  }, null, 2), "utf8");

  try {
    await __peekTestRenderSession(snapshotPath, outputPath);
    const html = await readFile(outputPath, "utf8");

    assert.match(html, /data-copy-value="prt_tool"[^>]*data-copy-kind="Part"/);
    assert.match(html, /data-copy-value="call_0123456789abcdef"[^>]*data-copy-kind="Call"/);
    assert.match(html, />call_0123456789a…<\/span>/);
    assert.match(html, /data-copy-value="prt_no_call"[^>]*data-copy-kind="Part"/);
    assert.doesNotMatch(html, /data-copy-value="prt_no_call"[^>]*data-copy-kind="Call"/);
    assert.equal((html.match(/data-copy-kind="Call"/g) ?? []).length, 1);
  } finally {
    await rm(workspaceRoot, { recursive: true, force: true });
  }
});
