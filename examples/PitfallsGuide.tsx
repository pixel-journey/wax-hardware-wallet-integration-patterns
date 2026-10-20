"use client";

import { useId, useMemo } from "react";
import { analyzeHardwarePitfalls } from "./engines";
import type { HardwareIntegrationPosture, RiskLevel } from "./types";

export interface PitfallsGuideProps {
  posture: HardwareIntegrationPosture;
  className?: string;
}

const levelClass: Record<RiskLevel, string> = {
  low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-100",
  medium: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  high: "border-red-500/30 bg-red-500/10 text-red-100",
};

export function PitfallsGuide({ posture, className = "" }: PitfallsGuideProps) {
  const headingId = useId();
  const pitfalls = useMemo(() => analyzeHardwarePitfalls(posture), [posture]);

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-1">
        Integration pitfalls
      </h3>
      <p className="text-sm text-white/60 mb-4">
        Structural flags from the same posture answers.
      </p>
      <ul className="space-y-3" aria-live="polite">
        {pitfalls.map((p) => (
          <li
            key={p.id}
            className={`rounded-xl border p-3 text-sm ${levelClass[p.level]}`}
            role={p.level === "high" ? "alert" : undefined}
          >
            <div className="flex justify-between gap-2">
              <span className="font-medium">{p.title}</span>
              <span className="text-xs uppercase opacity-80">{p.level}</span>
            </div>
            <p className="mt-1 opacity-90 leading-relaxed">{p.detail}</p>
            <p className="mt-1 text-xs opacity-70">Trigger: {p.trigger}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
