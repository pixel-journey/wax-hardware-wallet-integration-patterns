"use client";

import { useCallback, useId, useState } from "react";
import { createDryRunSession, createSessionKit } from "./wharf/sessionFactory";
import { actorString, type SessionLike } from "./wharf/types";

/** Educational dry-run + confirm-gated real SessionKit login / micro-transfer. */
export function SessionSketchPanel({ className = "" }: { className?: string }) {
  const headingId = useId();
  const [session, setSession] = useState<SessionLike | null>(null);
  const [mode, setMode] = useState<"none" | "dry-run" | "wallet">("none");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [wallets, setWallets] = useState<string[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const useDryRun = useCallback(() => {
    const s = createDryRunSession();
    setSession(s);
    setMode("dry-run");
    setStatus(`Dry-run session as ${actorString(s)} (no broadcast)`);
    setError(null);
    setConfirmed(false);
  }, []);

  const connectWallet = useCallback(async () => {
    setBusy(true);
    setError(null);
    const r = await createSessionKit();
    if (!r.ok) {
      setError(r.reason);
      setBusy(false);
      return;
    }
    setWallets(r.wallets);
    try {
      const { session: s } = await r.kit.login();
      setSession(s);
      setMode("wallet");
      setStatus(`Connected as ${actorString(s)} · ${r.wallets.join(", ")}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Wallet connect failed");
      setMode("none");
      setSession(null);
    } finally {
      setBusy(false);
    }
  }, []);

  const sign = useCallback(async () => {
    const active = session ?? createDryRunSession();
    if (!session) {
      setSession(active);
      setMode("dry-run");
    }
    if (mode === "wallet" && !confirmed) {
      setError("Check confirm before live wallet broadcast");
      return;
    }
    setBusy(true);
    setError(null);
    try {
      const preview = {
        account: "eosio.token",
        name: "transfer",
        data: {
          from: actorString(active),
          to: "demo.wam",
          quantity: "0.00000001 WAX",
          memo: "hardware-pattern educational",
        },
      };
      const ok = window.confirm(
        `Preview before device/session:\n\n${JSON.stringify(preview, null, 2)}\n\nMode: ${mode === "wallet" ? "LIVE WALLET" : "dry-run"}`
      );
      if (!ok) {
        setStatus("Cancelled at preview (correct behavior)");
        setBusy(false);
        return;
      }
      const result = await active.transact({ actions: [preview] });
      setStatus(
        result.dryRun
          ? `Dry-run OK · ${result.transaction_id}`
          : `Transact returned · ${result.transaction_id ?? "check explorer"}`
      );
      setConfirmed(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "transact failed");
    } finally {
      setBusy(false);
    }
  }, [session, mode, confirmed]);

  return (
    <section
      className={`rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6 space-y-3 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg text-violet-100">
        Session (WharfKit · confirm-gated)
      </h3>
      <p className="text-sm text-violet-100/80 leading-relaxed">
        Prefer dry-run first. Live path: <strong>Anchor</strong> (Ledger often via
        Anchor). Never paste a seed into the page.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={useDryRun}
          disabled={busy}
          className="px-3 py-2 rounded-lg text-sm bg-white/10 disabled:opacity-50"
        >
          Use dry-run session
        </button>
        <button
          type="button"
          onClick={() => void connectWallet()}
          disabled={busy}
          className="px-3 py-2 rounded-lg text-sm bg-violet-600 disabled:opacity-50"
        >
          {busy ? "Working…" : "Login (Anchor / optional Ledger)"}
        </button>
        <button
          type="button"
          onClick={() => void sign()}
          disabled={busy || (mode === "wallet" && !confirmed)}
          className="px-3 py-2 rounded-lg text-sm bg-emerald-700 disabled:opacity-50"
        >
          Preview + sign
        </button>
      </div>

      {mode === "wallet" && (
        <label className="flex items-center gap-2 text-xs">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
          />
          I understand this may broadcast a real WAX transaction from my wallet
        </label>
      )}

      <p className="text-[11px] font-mono opacity-50">
        mode: {mode}
        {wallets.length ? ` · plugins: ${wallets.join(", ")}` : ""}
      </p>

      {status && (
        <p className="text-xs text-violet-100 break-all" role="status">
          {status}
        </p>
      )}
      {error && (
        <p className="text-xs text-red-300 break-all" role="alert">
          {error}
        </p>
      )}
    </section>
  );
}
