'use client';

import React, { useState } from 'react';
import {
  probeAccountKeys,
  summarizeOwnerKeys,
} from './accountKeyProbe';

export function KeyProbePanel({ className = '' }: { className?: string }) {
  const [account, setAccount] = useState('alice.wam');
  const [busy, setBusy] = useState(false);
  const [lines, setLines] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const run = async () => {
    setBusy(true);
    setError(null);
    setLines([]);
    const r = await probeAccountKeys(account);
    setBusy(false);
    if (!r.ok) {
      setError(r.reason);
      return;
    }
    const out = [`Account: ${r.account}`];
    for (const p of r.permissions) {
      out.push(
        `${p.perm_name} (parent ${p.parent || '—'}) threshold=${p.threshold} keys=${p.keys.length}`
      );
      for (const k of p.keys.slice(0, 4)) {
        out.push(`  · ${k.key.slice(0, 20)}… w=${k.weight}`);
      }
    }
    out.push(...summarizeOwnerKeys(r.permissions));
    setLines(out);
  };

  return (
    <section
      className={`rounded-2xl border border-sky-500/30 bg-sky-500/10 p-5 space-y-3 ${className}`}
    >
      <h3 className="font-semibold text-sky-100">On-chain key probe</h3>
      <p className="text-xs opacity-70">
        Soft-fail <code className="text-sky-200">get_account</code> — list keys on
        owner/active. Educational rotation check only.
      </p>
      <div className="flex flex-wrap gap-2">
        <input
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          className="flex-1 min-w-[10rem] rounded-lg border border-white/15 bg-black/50 px-3 py-2 font-mono text-sm"
          placeholder="account"
        />
        <button
          type="button"
          disabled={busy}
          onClick={() => void run()}
          className="px-3 py-2 rounded-lg text-sm bg-sky-700 disabled:opacity-50"
        >
          {busy ? 'Probing…' : 'Probe keys'}
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-300" role="alert">
          {error}
        </p>
      )}
      {lines.length > 0 && (
        <pre className="text-[10px] font-mono opacity-80 whitespace-pre-wrap overflow-auto max-h-48">
          {lines.join('\n')}
        </pre>
      )}
    </section>
  );
}
