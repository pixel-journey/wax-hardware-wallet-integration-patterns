"use client";

import { useId } from "react";

const LINKS = [
  {
    name: "wax-social-recovery-and-key-backup-tools",
    href: "https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools",
    why: "Device loss needs offline backups and/or multi-party owner paths — hardware is not a full backup plan.",
  },
  {
    name: "wax-multi-sig-proposal-builder-and-simulator",
    href: "https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator",
    why: "Treat the device as one weight in M-of-N, not sole authority.",
  },
  {
    name: "wax-secure-key-management-and-privacy-tools",
    href: "https://github.com/pixel-journey/wax-secure-key-management-and-privacy-tools",
    why: "Broader key hygiene alongside hardware isolation.",
  },
  {
    name: "ECOSYSTEM-RESILIENCE.md (PX §11)",
    href: "https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/ECOSYSTEM-RESILIENCE.md",
    why: "Keep setup and recovery steps outside a single vendor domain.",
  },
] as const;

export function RelatedBlueprints({ className = "" }: { className?: string }) {
  const headingId = useId();

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/30 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-1">
        Related blueprints
      </h3>
      <p className="text-sm text-white/60 mb-4">
        Hardware reduces software-key exposure; recovery and multi-sig complete the design.
      </p>
      <ul className="space-y-3">
        {LINKS.map((l) => (
          <li key={l.href} className="text-sm">
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-emerald-400 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded"
            >
              {l.name}
            </a>
            <p className="text-white/55 text-xs mt-0.5 leading-relaxed">{l.why}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
