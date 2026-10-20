"use client";

import { useId, useMemo, useState } from "react";
import {
  SIGNING_ERROR_MATRIX,
  type ErrorSeverity,
} from "./errorMatrix";

const severityClass: Record<ErrorSeverity, string> = {
  info: "border-sky-500/30 bg-sky-500/10 text-sky-100",
  recoverable: "border-amber-500/30 bg-amber-500/10 text-amber-100",
  blocking: "border-red-500/30 bg-red-500/10 text-red-100",
};

export function ErrorMatrixPanel({ className = "" }: { className?: string }) {
  const headingId = useId();
  const [filter, setFilter] = useState<ErrorSeverity | "all">("all");

  const rows = useMemo(
    () =>
      filter === "all"
        ? SIGNING_ERROR_MATRIX
        : SIGNING_ERROR_MATRIX.filter((e) => e.severity === filter),
    [filter]
  );

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 space-y-4 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg">
        Signing error-state matrix
      </h3>
      <p className="text-sm text-white/60">
        What the app should do when the device or session fails — avoid silent retries.
      </p>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter severity">
        {(["all", "info", "recoverable", "blocking"] as const).map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setFilter(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              filter === s ? "bg-emerald-600" : "bg-white/10"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <ul className="space-y-3">
        {rows.map((e) => (
          <li
            key={e.id}
            className={`rounded-xl border p-3 text-sm ${severityClass[e.severity]}`}
          >
            <div className="flex flex-wrap justify-between gap-2">
              <span className="font-medium">{e.title}</span>
              <span className="text-xs uppercase opacity-80">{e.severity}</span>
            </div>
            <p className="text-xs opacity-70 mt-1">Trigger: {e.trigger}</p>
            <p className="mt-2 leading-relaxed opacity-95">
              <strong className="font-medium">User:</strong> {e.userMessage}
            </p>
            <p className="mt-1 leading-relaxed opacity-95">
              <strong className="font-medium">App:</strong> {e.appShould}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
