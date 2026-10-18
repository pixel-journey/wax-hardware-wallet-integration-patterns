/**
 * Pure educational engines for hardware wallet integration posture.
 */

import type {
  ChecklistItem,
  HardwareIntegrationPosture,
  IntegrationPitfall,
  ReadinessScore,
} from "./types";

export function scoreHardwareReadiness(
  posture: HardwareIntegrationPosture
): ReadinessScore {
  const items: ChecklistItem[] = [
    {
      id: "no-seed",
      passed: posture.noSeedInBrowser,
      label: "No seed or private key material in the browser",
      detail: posture.noSeedInBrowser
        ? "Host never handles seed material"
        : "Any seed entry in-page defeats hardware isolation",
    },
    {
      id: "owner-rare",
      passed: posture.ownerNotUsedDaily,
      label: "Owner not used for routine signing",
      detail: posture.ownerNotUsedDaily
        ? "Daily ops use active (or lower)"
        : "Owner on every tx maximizes authority-change risk",
    },
    {
      id: "preview",
      passed: posture.clearTxPreview,
      label: "Clear transaction preview before device confirm",
      detail: posture.clearTxPreview
        ? "Users can match UI to device screen"
        : "Blind device confirms are a classic failure mode",
    },
    {
      id: "secondary",
      passed: posture.secondaryRecoveryPath,
      label: "Secondary path if device is lost",
      detail: posture.secondaryRecoveryPath
        ? "Backup and/or multi-sig exists"
        : "Single device = single point of lockout",
    },
    {
      id: "errors",
      passed: posture.errorPathsHandled,
      label: "Cancel, disconnect, and timeout handled",
      detail: posture.errorPathsHandled
        ? "UX degrades calmly"
        : "Failed device sessions strand users mid-flow",
    },
  ];

  const passed = items.filter((i) => i.passed).length;
  const score = Math.round((passed / items.length) * 100);
  return { score, items };
}

export function analyzeHardwarePitfalls(
  posture: HardwareIntegrationPosture
): IntegrationPitfall[] {
  const pitfalls: IntegrationPitfall[] = [];

  if (!posture.noSeedInBrowser) {
    pitfalls.push({
      id: "seed-in-browser",
      level: "high",
      title: "Seed or key handled in the host",
      detail: "Hardware isolation is broken if the page can see key material.",
      trigger: "noSeedInBrowser",
    });
  }

  if (!posture.ownerNotUsedDaily) {
    pitfalls.push({
      id: "owner-daily",
      level: "high",
      title: "Owner used for daily operations",
      detail: "Routine malware/phishing impact includes authority changes.",
      trigger: "ownerNotUsedDaily",
    });
  }

  if (!posture.clearTxPreview) {
    pitfalls.push({
      id: "blind-sign",
      level: "medium",
      title: "Weak transaction preview",
      detail: "Users cannot verify what the device is authorizing.",
      trigger: "clearTxPreview",
    });
  }

  if (!posture.secondaryRecoveryPath) {
    pitfalls.push({
      id: "single-device",
      level: "high",
      title: "Single-device dependency",
      detail: "Lost or broken device without backup/multi-sig can lock the account.",
      trigger: "secondaryRecoveryPath",
    });
  }

  if (!posture.errorPathsHandled) {
    pitfalls.push({
      id: "error-ux",
      level: "medium",
      title: "Incomplete device error UX",
      detail: "Unhandled disconnects cause failed or repeated signatures.",
      trigger: "errorPathsHandled",
    });
  }

  if (pitfalls.length === 0) {
    pitfalls.push({
      id: "ok",
      level: "low",
      title: "No structural red flags under these answers",
      detail:
        "Still test real firmware, WharfKit versions, and permission layout on chain.",
      trigger: "overall",
    });
  }

  return pitfalls;
}
