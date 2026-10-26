# wax-hardware-wallet-integration-patterns

> **Trust label:** `educational-reference`  
> **Status:** Passes **1–4** education + **Pass 5** WharfKit/probe/export (2026-10-26)

Educational **hardware wallet** patterns for WAX/Antelope: readiness scoring, signing UX, error matrix, owner rotation drill, hot/cold model.

```bash
npm install && npm test && npm run dev
```

| Layer | Features |
|-------|----------|
| Pure | Readiness, pitfalls, rotation drill, error matrix, markdown export |
| Probe | Soft-fail `get_account` key summary for owner/active |
| Session | Dry-run + optional WharfKit (**Anchor**; Ledger optional) |

**Never** paste seeds into the page. Practice owner rotation on throwaway accounts.

Correct WAX mainnet chain id is used in SessionKit bootstrap.

[POLICY.md](./POLICY.md) · [ARCHITECTURE.md](./ARCHITECTURE.md)

MIT — Pixel Journey
