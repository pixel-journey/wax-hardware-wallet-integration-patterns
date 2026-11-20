# Education — hardware wallets on WAX

> **Rung:** `npm test` passes (16). Readiness is a checklist of booleans. Nothing here reads a Ledger or asks for a seed.  
> **The test is the rule.** Official: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions) · [WharfKit](https://wharfkit.com/).

## Learning outcomes

| Level | After this file |
| --- | --- |
| Beginner | Score 100 only when all five readiness flags are true |
| Intermediate | Fail high on seed-in-browser even if other flags pass |
| Masterclass | Require cancel, disconnect, and timeout paths before calling a device "ready" |

---

## Beginner — locked results

| Call | Locked result |
| --- | --- |
| all five readiness flags true | score `100` |
| all five false | score `0` |
| `noSeedInBrowser: false` and the rest true | pitfall id `seed-in-browser` at `high` |
| all five true | pitfall id `ok` at `low` |
| no drill steps completed | rotation drill score `0` |
| every drill id completed | rotation drill score `100` |
| completed `inventory` and `test-account` | prepare phase `done` is `2` |
| only `user-cancel` | error paths handled is false |
| `user-cancel`, `disconnect`, and `timeout` | error paths handled is true |

A device that can be unplugged is not ready until cancel, disconnect, and timeout each have a path. Typing a seed into the page fails the high check even if every other flag is true.

```bash
npm test
```

---

## Intermediate — principles

1. **Keys stay on device** — never type seeds into a dApp.  
2. **Owner is rare** — daily ops via `active` or limited permissions (session-keys repo).  
3. **Preview before confirm** — match UI to device screen.  
4. **Second path** — backup device, multi-sig, or social recovery.  
5. **Errors** — cancel, unplug, timeout must not strand the user.

### WharfKit path

- **Anchor** is the primary recommended wallet plugin (often bridges Ledger).
- Optional `@wharfkit/wallet-plugin-ledger` when available.
- Prefer Session Kit over eosjs / UAL for greenfield work.

---

## Masterclass — cluster

| Question | Repo |
| --- | --- |
| Who recovers owner if the device is lost? | [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) |
| How to change the key without locking the account? | [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) |
| Daily actions that should not touch this device | [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) |
| A proposal several people must approve | [msig builder](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator) |

### Common mistakes

1. Pasting a seed "just this once" into the browser.  
2. Using the hardware owner key for every game claim.  
3. Shipping UX with only a success path (no cancel/disconnect/timeout).

### Exercises

1. All flags true except `noSeedInBrowser` — pitfall? (`seed-in-browser` high.)  
2. Only cancel handled — error paths complete? (No.)  
3. Does this lab talk to a Ledger? (No.)

---

## What this course will not teach

- Live USB/HID device APIs
- Collecting or validating seed phrases
- That a readiness score of 100 is a security audit
