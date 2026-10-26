'use client';

import React, { useEffect, useId, useMemo, useState } from 'react';
import { ErrorCoveragePanel } from '../src/ErrorCoveragePanel';
import { ErrorMatrixPanel } from '../src/ErrorMatrixPanel';
import { KeyProbePanel } from '../src/KeyProbePanel';
import { PermissionDiagram } from '../src/PermissionDiagram';
import { PermissionPatterns } from '../src/PermissionPatterns';
import { PitfallsGuide } from '../src/PitfallsGuide';
import { ReadinessChecklist } from '../src/ReadinessChecklist';
import { RelatedBlueprints } from '../src/RelatedBlueprints';
import { RotationDrillPanel } from '../src/RotationDrillPanel';
import { SessionSketchPanel } from '../src/SessionSketchPanel';
import { SigningFlowSteps } from '../src/SigningFlowSteps';
import {
  analyzeHardwarePitfalls,
  scoreHardwareReadiness,
} from '../src/engines';
import { exportReadinessMarkdown } from '../src/exportReport';
import {
  clearPosture,
  loadPosture,
  savePosture,
} from '../src/postureStorage';
import { errorPathsHandledFromIds } from '../src/rotationDrill';
import type { HardwareIntegrationPosture } from '../src/types';

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
  const [handledErrorIds, setHandledErrorIds] = useState<string[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const loaded = loadPosture();
    if (loaded.ok && loaded.value) {
      setPosture(loaded.value);
      setMessage('Restored posture draft');
    }
  }, []);

  useEffect(() => {
    const ok = errorPathsHandledFromIds(handledErrorIds);
    setPosture((p) =>
      p.errorPathsHandled === ok ? p : { ...p, errorPathsHandled: ok }
    );
  }, [handledErrorIds]);

  const readiness = useMemo(() => scoreHardwareReadiness(posture), [posture]);
  const pitfalls = useMemo(() => analyzeHardwarePitfalls(posture), [posture]);
  const highCount = pitfalls.filter((p) => p.level === 'high').length;

  const copyExport = async () => {
    try {
      await navigator.clipboard.writeText(exportReadinessMarkdown(posture));
      setMessage('Readiness markdown copied');
    } catch {
      setMessage('Clipboard unavailable');
    }
  };

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
            Readiness, hot/cold diagram, rotation drill, key probe, confirm-gated
            WharfKit. Never paste seeds.
          </p>
        </header>

        <PermissionDiagram />

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
              {key === 'errorPathsHandled' && (
                <span className="text-[10px] opacity-40">(auto from coverage)</span>
              )}
            </label>
          ))}

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="px-3 py-2 rounded-lg text-sm bg-sky-700"
              onClick={() => void copyExport()}
            >
              Copy readiness markdown
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-lg text-sm bg-violet-700"
              onClick={() => {
                const r = savePosture(posture);
                setMessage(r.ok ? 'Posture saved' : r.reason ?? 'save failed');
              }}
            >
              Save draft
            </button>
            <button
              type="button"
              className="px-3 py-2 rounded-lg text-sm bg-white/10"
              onClick={() => {
                clearPosture();
                setMessage('Draft cleared');
              }}
            >
              Clear draft
            </button>
          </div>

          <ReadinessChecklist posture={posture} />
        </section>

        <KeyProbePanel />

        <ErrorCoveragePanel
          handledIds={handledErrorIds}
          onChange={setHandledErrorIds}
        />

        <PitfallsGuide posture={posture} />

        <SessionSketchPanel />

        <ErrorMatrixPanel />

        <RotationDrillPanel />

        <SigningFlowSteps />

        <PermissionPatterns />

        <RelatedBlueprints />

        {message && (
          <p className="text-xs text-emerald-200/80" role="status">
            {message}
          </p>
        )}

        <p className="text-xs opacity-50">
          Pass 6–8 · educational-reference · never paste seeds
        </p>
      </div>
    </div>
  );
}
