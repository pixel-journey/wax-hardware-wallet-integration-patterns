"use client";

import { ReadinessChecklist } from "./ReadinessChecklist";
import { PitfallsGuide } from "./PitfallsGuide";
import { SigningFlowSteps } from "./SigningFlowSteps";
import { PermissionPatterns } from "./PermissionPatterns";
import type { HardwareIntegrationPosture } from "./types";

/** Intentionally incomplete posture so flags surface in the demo. */
const DEMO_POSTURE: HardwareIntegrationPosture = {
  noSeedInBrowser: true,
  ownerNotUsedDaily: false,
  clearTxPreview: false,
  secondaryRecoveryPath: false,
  errorPathsHandled: true,
};

export default function HardwareWalletDemo() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 p-6">
      <header className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-wider text-emerald-400/80">
          Pixel Journey · Security
        </p>
        <h1 className="text-2xl font-bold text-white">
          Hardware Wallet Integration Demo
        </h1>
        <p className="text-sm text-white/60 max-w-2xl">
          Educational readiness and pitfall panels. Pin real transport SDK
          versions in production apps — this repo teaches structure, not firmware.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <ReadinessChecklist posture={DEMO_POSTURE} />
        <PitfallsGuide posture={DEMO_POSTURE} />
      </div>
      <SigningFlowSteps />
      <PermissionPatterns />
    </div>
  );
}
