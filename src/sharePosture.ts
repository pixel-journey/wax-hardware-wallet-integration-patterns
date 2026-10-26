import type { HardwareIntegrationPosture } from "./types";

function b64urlEncode(s: string): string {
  if (typeof btoa === "function") {
    return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  return Buffer.from(s, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function b64urlDecode(s: string): string {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + pad;
  if (typeof atob === "function") return atob(b64);
  return Buffer.from(b64, "base64").toString("utf8");
}

export function encodePosture(posture: HardwareIntegrationPosture): string {
  return b64urlEncode(JSON.stringify(posture));
}

export function decodePosture(payload: string): HardwareIntegrationPosture | null {
  try {
    const o = JSON.parse(b64urlDecode(payload)) as HardwareIntegrationPosture;
    if (typeof o.noSeedInBrowser !== "boolean") return null;
    return o;
  } catch {
    return null;
  }
}

export function buildShareSearchParam(posture: HardwareIntegrationPosture): string {
  return `hw=${encodePosture(posture)}`;
}
