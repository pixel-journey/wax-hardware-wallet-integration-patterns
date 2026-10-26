/** Soft-fail get_account — list keys on owner/active for HW rotation checks. */

export type KeyRow = { key: string; weight: number };

export type PermKeys = {
  perm_name: string;
  parent: string;
  threshold: number;
  keys: KeyRow[];
};

export type AccountKeyProbe =
  | { ok: true; account: string; permissions: PermKeys[] }
  | { ok: false; reason: string };

const DEFAULT_RPC = "https://wax.greymass.com";

export async function probeAccountKeys(
  account: string,
  rpcUrl = DEFAULT_RPC
): Promise<AccountKeyProbe> {
  const name = account.trim();
  if (!name) return { ok: false, reason: "empty account" };
  try {
    const res = await fetch(`${rpcUrl.replace(/\/$/, "")}/v1/chain/get_account`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account_name: name }),
    });
    if (!res.ok) return { ok: false, reason: `HTTP ${res.status}` };
    const data = (await res.json()) as {
      account_name?: string;
      permissions?: Array<{
        perm_name: string;
        parent: string;
        required_auth?: {
          threshold?: number;
          keys?: Array<{ key: string; weight: number }>;
        };
      }>;
    };
    const permissions: PermKeys[] = (data.permissions ?? []).map((p) => ({
      perm_name: String(p.perm_name),
      parent: String(p.parent ?? ""),
      threshold: Number(p.required_auth?.threshold ?? 1),
      keys: (p.required_auth?.keys ?? []).map((k) => ({
        key: String(k.key),
        weight: Number(k.weight ?? 1),
      })),
    }));
    return {
      ok: true,
      account: data.account_name ?? name,
      permissions,
    };
  } catch (e) {
    return {
      ok: false,
      reason: e instanceof Error ? e.message : "fetch failed",
    };
  }
}

/** Educational: does owner look hardware-shaped (few keys, high threshold)? */
export function summarizeOwnerKeys(permissions: PermKeys[]): string[] {
  const owner = permissions.find((p) => p.perm_name === "owner");
  if (!owner) return ["owner permission not in probe"];
  const lines = [
    `owner threshold=${owner.threshold}, keys=${owner.keys.length}`,
  ];
  if (owner.keys.length === 1 && owner.threshold === 1) {
    lines.push(
      "Single owner key — pair with backup device / multi-sig / social recovery."
    );
  }
  if (owner.keys.length > 1) {
    lines.push("Multiple owner keys — verify each is intended (HW + backup)."
    );
  }
  return lines;
}
