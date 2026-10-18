"use client";

import { useId, useMemo } from "react";
import { scoreHardwareReadiness } from "./engines";
import type { HardwareIntegrationPosture } from "./types";

export interface ReadinessChecklistProps {
  posture: HardwareIntegrationPosture;
  className?: string;
}

export function ReadinessChecklist({
  posture,
  className = "",
}: ReadinessChecklistProps) {
  const headingId = useId();
  const result = useMemo(() => scoreHardwareReadiness(posture), [posture]);

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-1">
        Hardware integration readiness
      </h3>
      <p className="text-sm text-white/60 mb-4">
        Score{" "}
        <span className="font-mono text-emerald-400">{result.score}/100</span>
      </p>
      <ul className="space-y-3">
        {result.items.map((item) => (
          <li key={item.id} className="flex gap-3 text-sm border-b border-white/5 pb-3 last:border-0">
            <span className={item.passed ? "text-emerald-400" : "text-amber-300"}>
              {item.passed ? "✓" : "!"}
            </span>
            <div>
              <p className="font-medium text-white/90">{item.label}</p>
              <p className="text-xs text-white/50 mt-0.5">{item.detail}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
