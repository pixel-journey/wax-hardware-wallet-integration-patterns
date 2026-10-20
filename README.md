# wax-hardware-wallet-integration-patterns

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** 🔄 Pass 2 — error matrix + dry-run session sketch  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational hardware wallet integration patterns for Antelope/WAX.

## Quick start

```bash
npm install && npm test && npm run dev
```

## Pass 2 surface

| Piece | Role |
|-------|------|
| Readiness engines | Checklist score + structural pitfalls |
| `SIGNING_ERROR_MATRIX` | Cancel, disconnect, timeout, wrong-chain, blind-sign |
| `SessionSketchPanel` | Dry-run first; optional WharfKit login |
| Related blueprints | Social recovery, multi-sig, resilience |

Optional peers for real wallet UI:

```bash
npm i @wharfkit/session @wharfkit/web-renderer @wharfkit/wallet-plugin-anchor
# optional: @wharfkit/wallet-plugin-ledger
```

**Never** paste seeds into the page.

## License

MIT — **Pixel Journey**
