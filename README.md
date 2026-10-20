# wax-hardware-wallet-integration-patterns

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** ✅ Pass 4 complete  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational **hardware wallet** integration patterns for Antelope/WAX — readiness scoring, signing UX, error matrix, owner rotation drill, hot/cold permission model.

## Quick start

```bash
npm install && npm test && npm run dev
```

```ts
import { scoreHardwareReadiness } from "./examples/engines";
import { scoreRotationDrill } from "./examples/rotationDrill";
import { createDryRunSession } from "./examples/wharf/sessionFactory";
```

## Surface

| Layer | Features |
|-------|----------|
| Pure engines | Readiness, pitfalls, rotation drill, error matrix |
| Session | Dry-run first; optional WharfKit peers |
| UI | Diagram, coverage→posture, drill, signing steps |
| Docs | Related social-recovery / multi-sig / PX §11 |

**Never** paste seeds into the page. Practice owner rotation on throwaway accounts.

## License

MIT — **Pixel Journey**
