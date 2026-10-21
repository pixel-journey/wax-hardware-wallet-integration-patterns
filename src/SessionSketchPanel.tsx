"use client";

import { useCallback, useId, useState } from "react";
import { createDryRunSession, createSessionKit } from "./wharf/sessionFactory";
import { actorString, type SessionLike } from "./wharf/types";

/** Educational dry-run + optional real SessionKit login. */
export function SessionSketchPanel({ className = "" }: { className?: string }) {
  const headingId = useId();
  const [session, setSession] = useState<SessionLike | null>(null);
  const [mode, setMode] = useState<"none" | "dry-run" | "wallet">("none");
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const useDryRun = useCallback(() => {
    const s = createDryRunSession();
    setSession(s);
    setMode("dry-run");
    setStatus(`Dry-run session as ${actorString(s)} (no broadcast)`);
    setError(null);
  }, []);

  const connectWallet = useCallback(async () => {
    setBusy(true);
    setError(null);
    try {
      const kit = await createSessionKit();
      const { session: s } = await kit.login();
      setSession(s);
      setMode("wallet");
      setStatus(`Connected as ${actorString(s)}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Wallet connect failed");
      setMode("none");
      setSession(null);
    } finally {
      setBusy(false);
    }
  }, []);

  const drySign = useCallback(async () => {
    const active = session ?? createDryRunSession();
    if (!session) {
      setSession(active);
      setMode("dry-run");
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
          memo: "hardware-pattern dry-run",
        },
      };
      const ok = window.confirm(
        `Preview before device/session:\n\n${JSON.stringify(preview, null, 2)}\n\nMode: ${mode === "wallet" ? "wallet" : "dry-run"}`
      );
      if (!ok) {
        setStatus("Cancelled at preview (correct behavior)");
        return;
      }
      const result = await active.transact({ actions: [preview] });
      setStatus(
        result.dryRun
          ? `Dry-run OK · ${result.transaction_id}`
          : `Transact returned · ${result.transaction_id ?? "no tx id"}`
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "transact failed");
    } finally {
      setBusy(false);
    }
  }, [session, mode]);

  return (
    <section
      className={`rounded-2xl border border-violet-500/30 bg-violet-500/10 p-6 space-y-3 ${className}`}
      aria-labelledby={headingId}
    >
      <h3 id={headingId} className="font-semibold text-lg text-violet-100">
        Session sketch (WharfKit)
      </h3>
      <p className="text-sm text-violet-100/80 leading-relaxed">
        Prefer dry-run first. Real login needs optional WharfKit peers. Never paste a
        seed into the page.
      </p>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={useDryRun}
          disabled={busy}
          className="px-3 py-2 rounded-lg text-sm bg-white/10 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          Use dry-run session
        </button>
        <button
          type="button"
          onClick={connectWallet}
          disabled={busy}
          className="px-3 py-2 rounded-lg text-sm bg-violet-600 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
        >
          {busy ? "Working…" : "Connect wallet (optional)"}
        </button>
        <button
          type="button"
          onClick={drySign}
          disabled={busy}
          className="px-3 py-2 rounded-lg text-sm bg-emerald-700 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          Preview + dry sign
        </button>
      </div>

      <p className="text-[11px] font-mono opacity-50">mode: {mode}</p>

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
