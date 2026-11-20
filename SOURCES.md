# Sources

| Source | Use |
| --- | --- |
| [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) | Owner vs active |
| [WharfKit](https://wharfkit.com/) | Session / wallet plugins |
| [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) | Second path if device lost |
| [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) | Daily actions off the device |
| [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) | Change keys without lockout |

## Product facts locked by tests

- Five readiness flags all true → score **100**; all false → **0**.
- `noSeedInBrowser: false` → pitfall **`seed-in-browser`** at **high** even if other flags are true.
- Error paths complete only when **user-cancel**, **disconnect**, and **timeout** are all handled.
- Rotation drill: no steps → 0; every id → 100.
- **Does not** talk to a hardware device. **Never** paste a seed.
