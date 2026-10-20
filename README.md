# wax-hardware-wallet-integration-patterns

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** 🔄 Pass 3 — rotation drill + permission diagram + error coverage  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational hardware wallet integration patterns for Antelope/WAX.

## Quick start

```bash
npm install && npm test && npm run dev
```

## Pass 3 surface

| Piece | Role |
|-------|------|
| Permission diagram | Hot active / cold owner |
| Rotation drill | Prepare → execute → verify checklist |
| Error coverage | Maps cancel/disconnect/timeout → `errorPathsHandled` |
| Session sketch | Dry-run + optional WharfKit |
| Error matrix | Full failure UX table |

**Never** paste seeds into the page. Practice owner rotation on throwaway accounts.

## License

MIT — **Pixel Journey**
