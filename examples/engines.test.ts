import { describe, expect, it } from "vitest";
import { analyzeHardwarePitfalls, scoreHardwareReadiness } from "./engines";

const strong = {
  noSeedInBrowser: true,
  ownerNotUsedDaily: true,
  clearTxPreview: true,
  secondaryRecoveryPath: true,
  errorPathsHandled: true,
};

describe("scoreHardwareReadiness", () => {
  it("scores 100 when all checks pass", () => {
    expect(scoreHardwareReadiness(strong).score).toBe(100);
  });

  it("scores 0 when all fail", () => {
    const weak = {
      noSeedInBrowser: false,
      ownerNotUsedDaily: false,
      clearTxPreview: false,
      secondaryRecoveryPath: false,
      errorPathsHandled: false,
    };
    expect(scoreHardwareReadiness(weak).score).toBe(0);
  });
});

describe("analyzeHardwarePitfalls", () => {
  it("flags seed-in-browser as high", () => {
    const pitfalls = analyzeHardwarePitfalls({
      ...strong,
      noSeedInBrowser: false,
    });
    expect(pitfalls.some((p) => p.id === "seed-in-browser" && p.level === "high")).toBe(
      true
    );
  });

  it("emits low ok when posture is strong", () => {
    const pitfalls = analyzeHardwarePitfalls(strong);
    expect(pitfalls.some((p) => p.id === "ok" && p.level === "low")).toBe(true);
  });
});
