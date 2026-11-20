# Security — hardware readiness checklist

## Closed in tests

| Issue | Behavior |
| --- | --- |
| Seed allowed in browser | pitfall `seed-in-browser` at **high** |
| Incomplete error paths | `error paths handled` false until cancel + disconnect + timeout |
| Empty drill | rotation drill score 0 |

## Not closed (production)

| Concern | Guidance |
| --- | --- |
| Real device | This lab never opens USB/HID |
| Firmware authenticity | Outside scope |
| Owner key exposure | Keep owner rare; use session keys for daily actions |

## Attack angles

1. Phishing pages that ask for the seed "to connect Ledger."  
2. Stranding users after unplug mid-sign.  
3. Using hardware owner for high-frequency game actions.

## Honesty limits

No device I/O. Never paste a seed. [docs.wax.io permissions](https://docs.wax.io/build/core-concepts/permissions) · [WharfKit](https://wharfkit.com/).
