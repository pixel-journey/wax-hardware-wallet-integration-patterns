import type { HardwareIntegrationPosture, ReadinessScore } from "./types";
import { analyzeHardwarePitfalls, scoreHardwareReadiness } from "./engines";

export function exportReadinessMarkdown(
  posture: HardwareIntegrationPosture
): string {
  const score: ReadinessScore = scoreHardwareReadiness(posture);
  const pitfalls = analyzeHardwarePitfalls(posture);
  const lines = [
    "# Hardware wallet readiness",
    "",
    `**Score:** ${score.score}/100`,
    "",
    "## Checklist",
    ...score.items.map(
      (i) => `- [${i.passed ? "x" : " "}] **${i.label}** — ${i.detail}`
    ),
    "",
    "## Pitfalls",
    ...pitfalls.map((p) => `- **[${p.level}] ${p.title}** — ${p.detail}`),
    "",
    "_Educational only. Never paste seeds into a browser._",
  ];
  return lines.join("\n");
}
