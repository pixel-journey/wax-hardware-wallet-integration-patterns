# Security — hardware readiness checklist

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Seed allowed in browser | pitfall `seed-in-browser` at **high** (even if other flags pass) |
| Incomplete error paths | `error paths handled` false until **cancel + disconnect + timeout** |
| Empty rotation drill | drill score 0 |
| All five readiness flags true | score **100** |
| All five false | score **0** |

Five readiness flags must all be true for a full score (device present, transport ok, error paths, rotation drill, no seed-in-browser).

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Real device I/O | This lab never opens USB/HID |
| Firmware authenticity | Outside scope |
| Owner key exposure | Keep owner rare; use session keys for daily actions |
| Bridge trust | Anchor / plugin path still needs user preview on device screen |

## Attack angles

1. Phishing pages that ask for the seed "to connect Ledger."  
2. Stranding users after unplug mid-sign (no disconnect path).  
3. Using hardware **owner** for high-frequency game claims.  
4. Shipping only a success path (cancel-only is not enough).  
5. Treating readiness score 100 as a formal security audit.

## Honesty limits

No device I/O. Never paste a seed.

| Sibling | Distinction |
| --- | --- |
| [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) | Limited daily authority |
| [key rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) | Add-first sequence |
| [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) | Helper weights |
| [permission auditor](https://github.com/pixel-journey/wax-account-permission-auditor) | Structure score |

Prefer WharfKit + Anchor for greenfield. [docs.wax.io permissions](https://docs.wax.io/build/core-concepts/permissions) · [WharfKit](https://wharfkit.com/).
