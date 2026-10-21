"use client";

import { useId } from "react";

export function PermissionDiagram({ className = "" }: { className?: string }) {
  const headingId = useId();

  return (
    <section
      className={`rounded-2xl border border-sky-500/30 bg-sky-500/10 p-6 space-y-4 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg text-sky-100">
        Permission diagram · hot active / cold owner
      </h3>
      <p className="text-sm text-sky-100/80 leading-relaxed">
        Educational layout — verify live authorities on-chain before relying on it.
      </p>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4 space-y-2">
          <p className="text-xs uppercase tracking-wide text-amber-200/90">Daily</p>
          <p className="font-mono text-lg text-amber-100">active</p>
          <ul className="text-xs text-amber-100/85 space-y-1 list-disc pl-4">
            <li>dApp sessions (WharfKit)</li>
            <li>Transfers, game actions</li>
            <li>Can be software or hardware</li>
            <li>Cannot replace owner</li>
          </ul>
        </div>
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 space-y-2">
          <p className="text-xs uppercase tracking-wide text-emerald-200/90">Rare</p>
          <p className="font-mono text-lg text-emerald-100">owner</p>
          <ul className="text-xs text-emerald-100/85 space-y-1 list-disc pl-4">
            <li>Prefer hardware and/or M-of-N</li>
            <li>Authority changes only</li>
            <li>Rotation drills on throwaway first</li>
            <li>Offline runbook required</li>
          </ul>
        </div>
      </div>

      <div
        className="rounded-xl border border-white/10 bg-black/40 p-3 text-xs font-mono text-white/70 space-y-1"
        aria-hidden="true"
      >
        <p className="text-center text-emerald-400/90">owner (cold)</p>
        <p className="text-center opacity-40">│ controls</p>
        <p className="text-center text-amber-300/90">active (hot)</p>
        <p className="text-center opacity-40">│ signs</p>
        <p className="text-center">dApps · transfers · games</p>
      </div>

      <p className="text-[11px] text-sky-100/60">
        Anti-pattern: same key on owner and active — a daily compromise equals full
        account capture.
      </p>
    </section>
  );
}
