import { describe, expect, it } from "vitest";
import {
  SIGNING_ERROR_MATRIX,
  errorsBySeverity,
  findErrorCase,
} from "./errorMatrix";

describe("SIGNING_ERROR_MATRIX", () => {
  it("includes cancel and disconnect cases", () => {
    expect(findErrorCase("user-cancel")).toBeTruthy();
    expect(findErrorCase("disconnect")?.severity).toBe("recoverable");
  });

  it("has at least one blocking case", () => {
    expect(errorsBySeverity("blocking").length).toBeGreaterThan(0);
  });

  it("every case has userMessage and appShould", () => {
    for (const c of SIGNING_ERROR_MATRIX) {
      expect(c.userMessage.length).toBeGreaterThan(5);
      expect(c.appShould.length).toBeGreaterThan(5);
    }
  });
});
