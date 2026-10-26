/**
 * WharfKit SessionKit bootstrap for hardware-friendly paths.
 * Prefer Anchor (often bridges Ledger). Optional Ledger plugin if installed.
 * Dynamic import keeps education install-light.
 */

import type { SessionLike } from "./types";

/** WAX mainnet chain id (Antelope). */
export const WAX_MAINNET_CHAIN_ID =
  "1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4";

export interface CreateSessionKitOptions {
  appName?: string;
  rpcUrl?: string;
  chainId?: string;
}

export interface SessionKitLike {
  login(): Promise<{ session: SessionLike }>;
  logout?(session?: SessionLike): Promise<void>;
  restore?(): Promise<SessionLike | undefined>;
}

export async function createSessionKit(
  options: CreateSessionKitOptions = {}
): Promise<
  | { ok: true; kit: SessionKitLike; wallets: string[] }
  | { ok: false; reason: string }
> {
  const appName = options.appName ?? "pxj-hardware-patterns";
  const rpcUrl = options.rpcUrl ?? "https://wax.greymass.com";
  const chainId = options.chainId ?? WAX_MAINNET_CHAIN_ID;

  try {
    const [{ SessionKit }, { WebRenderer }, { WalletPluginAnchor }] =
      await Promise.all([
        import("@wharfkit/session"),
        import("@wharfkit/web-renderer"),
        import("@wharfkit/wallet-plugin-anchor"),
      ]);

    const walletPlugins: unknown[] = [new WalletPluginAnchor()];
    const wallets = ["anchor"];

    try {
      const ledgerMod = await import("@wharfkit/wallet-plugin-ledger");
      const C = (ledgerMod as { WalletPluginLedger?: new () => unknown })
        .WalletPluginLedger;
      if (C) {
        walletPlugins.push(new C());
        wallets.push("ledger");
      }
    } catch {
      /* Ledger peer optional */
    }

    const kit = new SessionKit({
      appName,
      chains: [{ id: chainId, url: rpcUrl }],
      ui: new WebRenderer(),
      walletPlugins,
    }) as unknown as SessionKitLike;

    return { ok: true, kit, wallets };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      reason: `WharfKit unavailable (${msg}). npm i @wharfkit/session @wharfkit/web-renderer @wharfkit/wallet-plugin-anchor`,
    };
  }
}

/** Dry-run session for demos — never broadcasts. */
export function createDryRunSession(actor = "demo.wam"): SessionLike {
  return {
    actor,
    permission: "active",
    async transact(args) {
      return {
        transaction_id: `dry-run-${Date.now()}`,
        dryRun: true,
        actions: args.actions,
      };
    },
  };
}
