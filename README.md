# Hardware readiness is five booleans — not a Ledger driver

> **Trust:** `educational-reference`  
> **Course:** [EDUCATION.md](EDUCATION.md)

**One-sentence goal:** Score whether a seed stays off the page, owner is not the daily key, the preview is clear, a second recovery path exists, and cancel / disconnect / timeout are all handled.

**Code under test:** `npm test` (16). Does not talk to a device. **Never paste a seed.**

Official: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) · [WharfKit](https://wharfkit.com/).

## What is true (executed)

| Rule | Result |
| --- | --- |
| All five flags true | score 100, pitfall `ok` |
| All five false | score 0 |
| Seed typed into the browser | `seed-in-browser` high |
| Empty drill | score 0 |
| Cancel only | error paths not handled |
| Cancel + disconnect + timeout | error paths handled |

## Related

- [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) — the second path this checklist asks for
- [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant)
- [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions)
- [eosio.msig builder](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator)
- [auditor](https://github.com/pixel-journey/wax-account-permission-auditor)

```bash
npm test
```

MIT — Pixel Journey
