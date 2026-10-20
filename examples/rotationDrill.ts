/**
 * Educational owner-key rotation drill — throwaway / low-value first.
 */

export interface RotationDrillItem {
  id: string;
  label: string;
  detail: string;
  phase: "prepare" | "execute" | "verify";
}

export interface RotationDrillState {
  completedIds: string[];
}

export const ROTATION_DRILL_ITEMS: RotationDrillItem[] = [
  {
    id: "inventory",
    phase: "prepare",
    label: "Inventory current owner / active authorities",
    detail: "Record public keys and account auths from get_account (explorer or social-recovery live panel).",
  },
  {
    id: "test-account",
    phase: "prepare",
    label: "Use a throwaway or low-value account first",
    detail: "Never practice owner rotation only on your main treasury the first time.",
  },
  {
    id: "backup-ok",
    phase: "prepare",
    label: "Confirm offline backup of material that can restore owner",
    detail: "Hardware seed backup and/or multi-sig helpers documented offline (PX §11).",
  },
  {
    id: "new-owner-path",
    phase: "prepare",
    label: "Prepare the new owner path (hardware and/or M-of-N)",
    detail: "New device keys or weighted accounts ready before changing chain state.",
  },
  {
    id: "update-owner",
    phase: "execute",
    label: "Update owner authority on-chain",
    detail: "Via current owner session — preview clearly; prefer hardware for this step.",
  },
  {
    id: "keep-active",
    phase: "execute",
    label: "Leave or re-set active for daily ops (not owner)",
    detail: "Active should remain the routine path; do not point daily dApps at owner.",
  },
  {
    id: "revoke-old",
    phase: "execute",
    label: "Revoke superseded keys when safe",
    detail: "Only after new owner is proven; avoid locking yourself out mid-rotation.",
  },
  {
    id: "verify-explorer",
    phase: "verify",
    label: "Verify owner/active on explorer",
    detail: "Confirm thresholds, keys, and account auths match the plan.",
  },
  {
    id: "dry-sign-active",
    phase: "verify",
    label: "Dry-run or small active signature still works",
    detail: "Routine path unbroken after owner change.",
  },
  {
    id: "update-runbook",
    phase: "verify",
    label: "Update offline runbook",
    detail: "Who holds what, when owner is used, recovery contacts.",
  },
];

export function scoreRotationDrill(state: RotationDrillState): {
  score: number;
  completed: number;
  total: number;
  byPhase: Record<string, { done: number; total: number }>;
} {
  const total = ROTATION_DRILL_ITEMS.length;
  const completed = ROTATION_DRILL_ITEMS.filter((i) =>
    state.completedIds.includes(i.id)
  ).length;
  const byPhase: Record<string, { done: number; total: number }> = {};
  for (const item of ROTATION_DRILL_ITEMS) {
    if (!byPhase[item.phase]) byPhase[item.phase] = { done: 0, total: 0 };
    byPhase[item.phase].total += 1;
    if (state.completedIds.includes(item.id)) byPhase[item.phase].done += 1;
  }
  return {
    score: Math.round((completed / total) * 100),
    completed,
    total,
    byPhase,
  };
}

/** Map error-matrix coverage → posture.errorPathsHandled heuristic. */
export function errorPathsHandledFromIds(handledErrorIds: string[]): boolean {
  const required = ["user-cancel", "disconnect", "timeout"];
  return required.every((id) => handledErrorIds.includes(id));
}
