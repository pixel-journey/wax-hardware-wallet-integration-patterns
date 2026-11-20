# Hardware wallets on WAX (education)

> **Rung:** `npm test` passes (16). Readiness is a checklist of booleans. Nothing here reads a Ledger or asks for a seed.  
> **The test is the rule.** Official model: [WAX permissions](https://docs.wax.io/build/core-concepts/permissions). Signing tool: [WharfKit](https://wharfkit.com/).

## Predict, then run

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

## Where this sits

| Question | Repo |
| --- | --- |
| Who else can recover owner if the device is lost? | [social recovery](https://github.com/pixel-journey/wax-social-recovery-and-key-backup-tools) |
| How do I change the key without locking the account? | [rotation](https://github.com/pixel-journey/wax-safe-key-rotation-assistant) |
| Daily actions that should not touch this device | [session keys](https://github.com/pixel-journey/wax-wharfkit-session-keys-and-linked-permissions) |
| A proposal that several people must approve | [eosio.msig builder](https://github.com/pixel-journey/wax-multi-sig-proposal-builder-and-simulator) |

## Principles


1. **Keys stay on device** — never type seeds into a dApp.
2. **Owner is rare** — daily ops via `active` or limited permissions (see session-keys repo).
3. **Preview before confirm** — match UI to device screen.
4. **Second path** — backup device, multi-sig, or social recovery.
5. **Errors** — cancel, unplug, timeout must not strand the user.

## WharfKit path

- **Anchor** is the primary recommended wallet plugin (often bridges Ledger).
- Optional `@wharfkit/wallet-plugin-ledger` when available.
- Prefer Session Kit over eosjs / UAL for greenfield work.

## Related blueprints

- wax-wharfkit-session-keys-and-linked-permissions
- wax-multi-sig-proposal-builder-and-simulator
- wax-social-recovery-and-key-backup-tools
- wax-safe-key-rotation-assistant
