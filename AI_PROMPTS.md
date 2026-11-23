# AI handoff — hardware wallet readiness

## Agent tooling

```bash
git clone https://github.com/wharfkit/skill.git ~/.claude/skills/wharfkit
```

| Source | Role |
| --- | --- |
| [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) | Owner vs daily keys |
| [WharfKit](https://wharfkit.com/) | Session / wallet plugins |
| [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) | Daily actions off the device |
| [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) | Second path if the device is lost |

## Non-negotiables

1. Five readiness flags all true → score **100**; all false → **0**.
2. `noSeedInBrowser: false` → pitfall **`seed-in-browser`** at **high** even if other flags pass.
3. Error paths are complete only when **user-cancel**, **disconnect**, and **timeout** are all handled. Cancel-only is not enough.
4. This lab **does not** talk to a device. **Never paste a seed.**
5. Score 100 is not a formal audit. Owner keys stay rare; session keys do daily claims.
6. Tests do not broadcast.

## Prompt seeds

- "Using scoreHardwareReadiness, list failed items and the minimum fixes."
- "Using analyzeHardwarePitfalls, explain high-severity issues in plain language."
- "Draft on-screen preview text before a hardware confirm for transfer and for updateauth."
- "Refuse a patch that types the seed into the page to 'connect Ledger'."

## Do not

- Open USB/HID from unit tests.
- Use hardware owner for high-frequency game claims.
- Treat readiness 100 as an audit certificate.
