"use client";

import { useId, useMemo, useState } from "react";
import {
  ROTATION_DRILL_ITEMS,
  scoreRotationDrill,
  type RotationDrillItem,
} from "./rotationDrill";

const PHASE_LABEL: Record<RotationDrillItem["phase"], string> = {
  prepare: "Prepare",
  execute: "Execute",
  verify: "Verify",
};

export function RotationDrillPanel({ className = "" }: { className?: string }) {
  const headingId = useId();
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const score = useMemo(
    () => scoreRotationDrill({ completedIds }),
    [completedIds]
  );

  const toggle = (id: string) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const phases = ["prepare", "execute", "verify"] as const;

  return (
    <section
      className={`rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 space-y-4 ${className}`}
      aria-labelledby={headingId}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id={headingId} className="font-semibold text-lg text-emerald-100">
          Owner rotation drill
        </h3>
        <p className="font-mono text-sm" aria-live="polite">
          {score.score}/100{" "}
          <span className="opacity-50 text-xs">
            ({score.completed}/{score.total})
          </span>
        </p>
      </div>
      <p className="text-sm text-emerald-100/80 leading-relaxed">
        Practice on a throwaway account. This checklist does not change chain state.
      </p>

      {phases.map((phase) => (
        <div key={phase} className="space-y-2">
          <p className="text-xs uppercase tracking-wide opacity-60">
            {PHASE_LABEL[phase]}{" "}
            <span className="font-mono">
              {score.byPhase[phase]?.done ?? 0}/{score.byPhase[phase]?.total ?? 0}
            </span>
          </p>
          <ul className="space-y-2">
            {ROTATION_DRILL_ITEMS.filter((i) => i.phase === phase).map((item) => {
              const done = completedIds.includes(item.id);
              return (
                <li key={item.id}>
                  <label className="flex gap-3 text-sm cursor-pointer rounded-xl border border-white/10 bg-black/30 p-3 hover:border-emerald-500/30">
                    <input
                      type="checkbox"
                      checked={done}
                      onChange={() => toggle(item.id)}
                      className="mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                    />
                    <span>
                      <span className="font-medium text-white/90">{item.label}</span>
                      <span className="block text-xs text-white/50 mt-0.5 leading-relaxed">
                        {item.detail}
                      </span>
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </section>
  );
}
