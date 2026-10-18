"use client";

import { useId } from "react";

const PATTERNS = [
  {
    name: "Hot active + cold owner",
    body: "Active on a convenient path for daily dApps; owner on hardware (or multi-sig) for authority changes only.",
  },
  {
    name: "Hardware as multi-sig weight",
    body: "Device is one signer among M-of-N — pair with wax-multi-sig-proposal-builder-and-simulator patterns.",
  },
  {
    name: "Spend limits via custom perms",
    body: "Optional lower permissions for game actions so a compromised session cannot move the treasury.",
  },
];

export interface PermissionPatternsProps {
  className?: string;
}

export function PermissionPatterns({ className = "" }: PermissionPatternsProps) {
  const headingId = useId();

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Recommended permission patterns
      </h3>
      <ul className="space-y-4">
        {PATTERNS.map((p) => (
          <li key={p.name} className="text-sm border-b border-white/5 pb-3 last:border-0">
            <p className="font-medium text-emerald-300/90">{p.name}</p>
            <p className="text-white/60 mt-1 leading-relaxed">{p.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
