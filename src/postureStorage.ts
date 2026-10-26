import type { HardwareIntegrationPosture } from "./types";

const KEY = "pxj-hw-posture-v1";

export function savePosture(posture: HardwareIntegrationPosture): {
  ok: boolean;
  reason?: string;
} {
  try {
    if (typeof localStorage === "undefined")
      return { ok: false, reason: "no localStorage" };
    localStorage.setItem(KEY, JSON.stringify(posture));
    return { ok: true };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "save failed",
    };
  }
}

export function loadPosture(): {
  ok: boolean;
  value?: HardwareIntegrationPosture;
  reason?: string;
} {
  try {
    if (typeof localStorage === "undefined")
      return { ok: false, reason: "no localStorage" };
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ok: true };
    return { ok: true, value: JSON.parse(raw) as HardwareIntegrationPosture };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "load failed",
    };
  }
}

export function clearPosture(): void {
  try {
    localStorage?.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
