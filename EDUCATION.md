# Hardware wallets on WAX (education)

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
