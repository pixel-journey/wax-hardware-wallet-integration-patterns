import { describe, expect, it } from "vitest";
import { decodePosture, encodePosture } from "./sharePosture";

describe("sharePosture", () => {
  it("roundtrips", () => {
    const p = {
      noSeedInBrowser: true,
      ownerNotUsedDaily: true,
      clearTxPreview: false,
      secondaryRecoveryPath: true,
      errorPathsHandled: false,
    };
    expect(decodePosture(encodePosture(p))).toEqual(p);
  });
});
