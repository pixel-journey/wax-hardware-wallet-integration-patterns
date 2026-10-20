import { describe, expect, it } from "vitest";
import {
  ROTATION_DRILL_ITEMS,
  errorPathsHandledFromIds,
  scoreRotationDrill,
} from "./rotationDrill";

describe("scoreRotationDrill", () => {
  it("scores 0 when empty", () => {
    expect(scoreRotationDrill({ completedIds: [] }).score).toBe(0);
  });

  it("scores 100 when all complete", () => {
    const ids = ROTATION_DRILL_ITEMS.map((i) => i.id);
    expect(scoreRotationDrill({ completedIds: ids }).score).toBe(100);
  });

  it("tracks phases", () => {
    const r = scoreRotationDrill({
      completedIds: ["inventory", "test-account"],
    });
    expect(r.byPhase.prepare.done).toBe(2);
  });
});

describe("errorPathsHandledFromIds", () => {
  it("requires cancel, disconnect, timeout", () => {
    expect(errorPathsHandledFromIds(["user-cancel"])).toBe(false);
    expect(
      errorPathsHandledFromIds(["user-cancel", "disconnect", "timeout"])
    ).toBe(true);
  });
});
