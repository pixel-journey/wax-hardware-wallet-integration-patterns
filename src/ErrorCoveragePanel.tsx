"use client";

import { useId, useMemo } from "react";
import { SIGNING_ERROR_MATRIX } from "./errorMatrix";
import { errorPathsHandledFromIds } from "./rotationDrill";

export interface ErrorCoveragePanelProps {
  handledIds: string[];
  onChange: (ids: string[]) => void;
  className?: string;
}

/** Toggle which error cases the integration claims to handle. */
export function ErrorCoveragePanel({
  handledIds,
  onChange,
  className = "",
}: ErrorCoveragePanelProps) {
  const headingId = useId();
  const pathsOk = useMemo(
    () => errorPathsHandledFromIds(handledIds),
    [handledIds]
  );

  const toggle = (id: string) => {
    onChange(
      handledIds.includes(id)
        ? handledIds.filter((x) => x !== id)
        : [...handledIds, id]
    );
  };

  return (
    <section
      className={`rounded-2xl border border-amber-500/30 bg-amber-500/10 p-6 space-y-3 ${className}`}
      aria-labelledby={headingId}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 id={headingId} className="font-semibold text-lg text-amber-100">
          Error coverage → posture
        </h3>
        <p className="text-xs font-mono" aria-live="polite">
          errorPathsHandled:{" "}
          <span className={pathsOk ? "text-emerald-400" : "text-amber-300"}>
            {pathsOk ? "true" : "false"}
          </span>
        </p>
      </div>
      <p className="text-sm text-amber-100/80">
        Minimum for a true flag: user-cancel, disconnect, and timeout. Mark what your
        app actually implements.
      </p>
      <ul className="space-y-2">
        {SIGNING_ERROR_MATRIX.map((e) => (
          <li key={e.id}>
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={handledIds.includes(e.id)}
                onChange={() => toggle(e.id)}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              />
              <span className="font-mono text-xs text-amber-200/90">{e.id}</span>
              <span className="opacity-70">{e.title}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
