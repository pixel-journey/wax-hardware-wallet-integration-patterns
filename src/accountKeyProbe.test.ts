import { describe, expect, it } from "vitest";
import { summarizeOwnerKeys } from "./accountKeyProbe";

describe("summarizeOwnerKeys", () => {
  it("flags single owner key", () => {
    const lines = summarizeOwnerKeys([
      {
        perm_name: "owner",
        parent: "",
        threshold: 1,
        keys: [{ key: "PUB_K1_x", weight: 1 }],
      },
    ]);
    expect(lines.some((l) => l.includes("Single owner"))).toBe(true);
  });
});
