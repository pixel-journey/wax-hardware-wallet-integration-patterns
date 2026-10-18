# ARCHITECTURE.md — Hardware Wallet Integration Patterns

## Intent

Educational patterns for secure, usable hardware-wallet use on Antelope/WAX. Device library details age quickly; **permission model + UX invariants** are the stable core.

## Invariants

| # | Invariant |
|---|-----------|
| 1 | Host app never requests or displays seed phrases |
| 2 | Readiness and pitfalls are pure / testable |
| 3 | Owner is not recommended for routine signing |
| 4 | Signing UX lists human-readable steps before device confirm |
| 5 | Single-device-only designs are flagged for lockout risk |

## Layers

```
Integration answers
  → engines (readiness score, pitfall flags)
  → ReadinessChecklist / PitfallsGuide / SigningFlowSteps / PermissionPatterns
  → (app) WharfKit session + vendor transport
```

## Note on SDKs

Ledger/other transports and app firmware versions change. Document pinned versions in consuming apps; this blueprint teaches structure, not a frozen binary API.

---

*Pixel Journey*
