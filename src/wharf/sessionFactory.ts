/**
 * Optional WharfKit SessionKit bootstrap for hardware paths.
 *
 * Install when ready:
 *   npm i @wharfkit/session @wharfkit/web-renderer \
 *         @wharfkit/wallet-plugin-anchor @wharfkit/wallet-plugin-ledger
 *
 * Dynamic import keeps the blueprint install-light.
 */

import type { SessionLike } from "./types";

export const WAX_MAINNET_CHAIN_ID =
  "1064487b3cd1a897ce03ae5b6a865651747e2e15209765797e784ba3fbf3c7ac";

export interface CreateSessionKitOptions {
  appName?: string;
  rpcUrl?: string;
  chainId?: string;
}

export interface SessionKitLike {
  login(): Promise<{ session: SessionLike }>;
  logout?(session?: SessionLike): Promise<void>;
}

export async function createSessionKit(
  options: CreateSessionKitOptions = {}
): Promise<SessionKitLike> {
  const appName = options.appName ?? "Pixel Journey Hardware Patterns";
  const rpcUrl = options.rpcUrl ?? "https://wax.greymass.com";
  const chainId = options.chainId ?? WAX_MAINNET_CHAIN_ID;

  try {
    const [{ SessionKit }, { WebRenderer }, anchorMod] = await Promise.all([
      import("@wharfkit/session"),
      import("@wharfkit/web-renderer"),
      import("@wharfkit/wallet-plugin-anchor"),
    ]);

    const WalletPluginAnchor = (
      anchorMod as { WalletPluginAnchor: new () => unknown }
    ).WalletPluginAnchor;

    // Ledger plugin is optional — Anchor often bridges hardware.
    let ledgerPlugin: unknown | null = null;
    try {
      const ledgerMod = await import("@wharfkit/wallet-plugin-ledger");
      const C = (ledgerMod as { WalletPluginLedger: new () => unknown })
        .WalletPluginLedger;
      if (C) ledgerPlugin = new C();
    } catch {
      ledgerPlugin = null;
    }

    const walletPlugins = [new WalletPluginAnchor()];
    if (ledgerPlugin) walletPlugins.push(ledgerPlugin as never);

    const kit = new SessionKit({
      appName,
      chains: [{ id: chainId, url: rpcUrl }],
      ui: new WebRenderer(),
      walletPlugins,
    });

    return kit as unknown as SessionKitLike;
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new Error(
      `WharfKit not available (${msg}). Install @wharfkit/session, @wharfkit/web-renderer, @wharfkit/wallet-plugin-anchor. Optional: @wharfkit/wallet-plugin-ledger.`
    );
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
