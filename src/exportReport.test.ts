import { describe, expect, it } from "vitest";
import { exportReadinessMarkdown } from "./exportReport";

describe("exportReadinessMarkdown", () => {
  it("includes score", () => {
    const md = exportReadinessMarkdown({
      noSeedInBrowser: true,
      ownerNotUsedDaily: true,
      clearTxPreview: true,
      secondaryRecoveryPath: true,
      errorPathsHandled: true,
    });
    expect(md).toContain("100");
    expect(md).toContain("Checklist");
  });
});
