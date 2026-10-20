'use client';

import React, { useId, useMemo, useState } from 'react';
import { ErrorMatrixPanel } from '../examples/ErrorMatrixPanel';
import { PermissionPatterns } from '../examples/PermissionPatterns';
import { PitfallsGuide } from '../examples/PitfallsGuide';
import { ReadinessChecklist } from '../examples/ReadinessChecklist';
import { RelatedBlueprints } from '../examples/RelatedBlueprints';
import { SessionSketchPanel } from '../examples/SessionSketchPanel';
import { SigningFlowSteps } from '../examples/SigningFlowSteps';
import {
  analyzeHardwarePitfalls,
  scoreHardwareReadiness,
} from '../examples/engines';
import type { HardwareIntegrationPosture } from '../examples/types';

const FIELDS: {
  key: keyof HardwareIntegrationPosture;
  label: string;
}[] = [
  { key: 'noSeedInBrowser', label: 'No seed / private key in the browser' },
  { key: 'ownerNotUsedDaily', label: 'Owner not used for routine signing' },
  { key: 'clearTxPreview', label: 'Clear tx preview before device confirm' },
  { key: 'secondaryRecoveryPath', label: 'Secondary path if device is lost' },
  { key: 'errorPathsHandled', label: 'Cancel / disconnect / timeout handled' },
];

export default function HardwareWalletPage() {
  const scoreId = useId();
  const [posture, setPosture] = useState<HardwareIntegrationPosture>({
    noSeedInBrowser: true,
    ownerNotUsedDaily: false,
    clearTxPreview: true,
    secondaryRecoveryPath: false,
    errorPathsHandled: false,
  });

  const readiness = useMemo(() => scoreHardwareReadiness(posture), [posture]);
  const pitfalls = useMemo(() => analyzeHardwarePitfalls(posture), [posture]);
  const highCount = pitfalls.filter((p) => p.level === 'high').length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <header>
          <p className="text-xs uppercase tracking-widest text-emerald-400/80">
            Pixel Journey · Security
          </p>
          <h1 className="text-2xl font-bold tracking-wide text-emerald-400 mt-1">
            HARDWARE WALLET PATTERNS
          </h1>
          <p className="text-sm opacity-60 mt-2 max-w-xl">
            Readiness scoring, signing error matrix, dry-run session sketch. Never
            paste seeds into the page.
          </p>
        </header>

        <section
          className="border border-white/10 rounded-2xl bg-black/40 p-5 space-y-4"
          aria-labelledby="posture-heading"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2
              id="posture-heading"
              className="text-sm font-semibold text-emerald-400/90"
            >
              Integration posture
            </h2>
            <p className="font-mono text-sm" id={scoreId} aria-live="polite">
              readiness:{' '}
              <span
                className={
                  readiness.score >= 80
                    ? 'text-emerald-400'
                    : readiness.score >= 40
                      ? 'text-amber-300'
                      : 'text-red-400'
                }
              >
                {readiness.score}/100
              </span>
              <span className="opacity-50 text-xs ml-2">high flags: {highCount}</span>
            </p>
          </div>

          {FIELDS.map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={posture[key]}
                onChange={(e) =>
                  setPosture((p) => ({ ...p, [key]: e.target.checked }))
                }
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                aria-describedby={scoreId}
              />
              {label}
            </label>
          ))}

          <ReadinessChecklist posture={posture} />
        </section>

        <PitfallsGuide posture={posture} />

        <SessionSketchPanel />

        <ErrorMatrixPanel />

        <SigningFlowSteps />

        <PermissionPatterns />

        <RelatedBlueprints />

        <p className="text-xs opacity-50">
          <code className="text-emerald-400/80">scoreHardwareReadiness</code> ·{' '}
          <code className="text-emerald-400/80">SIGNING_ERROR_MATRIX</code> ·{' '}
          <code className="text-emerald-400/80">createDryRunSession</code>
        </p>
      </div>
    </div>
  );
}
