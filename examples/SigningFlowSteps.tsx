"use client";

import { useId } from "react";

const STEPS = [
  {
    title: "Connect session",
    body: "User opens a WharfKit (or equivalent) session bound to the hardware path — no seed entry in the page.",
  },
  {
    title: "Preview the action",
    body: "Show contract, action name, and key fields in plain language before any device prompt.",
  },
  {
    title: "Request signature",
    body: "Transport the unsigned payload to the device. User compares on-device details to the UI preview.",
  },
  {
    title: "Confirm or cancel",
    body: "Device approve completes the session path; cancel/disconnect returns a calm error state — no silent retry storms.",
  },
  {
    title: "Confirm on-chain",
    body: "Wait for inclusion / known state; surface explorer links when useful.",
  },
];

export interface SigningFlowStepsProps {
  className?: string;
}

export function SigningFlowSteps({ className = "" }: SigningFlowStepsProps) {
  const headingId = useId();

  return (
    <section
      className={`rounded-2xl border border-white/10 bg-black/20 p-6 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg mb-4">
        Signing flow (educational)
      </h3>
      <ol className="space-y-4">
        {STEPS.map((s, i) => (
          <li key={s.title} className="text-sm">
            <p className="font-medium text-white/90">
              <span className="text-emerald-400/90 mr-2">{i + 1}.</span>
              {s.title}
            </p>
            <p className="text-white/60 mt-1 leading-relaxed pl-6">{s.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
