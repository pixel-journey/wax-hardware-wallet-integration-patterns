# wax-hardware-wallet-integration-patterns

> **Trust Label:** `educational-reference`  
> **Verification:** [VERIFICATION-LOG.md](VERIFICATION-LOG.md)  
> **Status:** 🔄 Pass 1 — readiness engines + interactive app  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

Educational patterns for **hardware wallet** integration on Antelope/WAX — permission discipline, signing UX, and readiness scoring. Device SDKs change; invariants are the durable layer.

## Quick start

```bash
npm install && npm test && npm run dev
```

```ts
import { scoreHardwareReadiness, analyzeHardwarePitfalls } from "./examples/engines";

const posture = {
  noSeedInBrowser: true,
  ownerNotUsedDaily: true,
  clearTxPreview: true,
  secondaryRecoveryPath: true,
  errorPathsHandled: true,
};

scoreHardwareReadiness(posture);
analyzeHardwarePitfalls(posture);
```

## Core checks

| Check | Why |
|-------|-----|
| No seed in browser | Isolation is the product |
| Owner not daily | Authority-change blast radius |
| Clear tx preview | Match UI to device screen |
| Secondary recovery | Device loss is expected |
| Error paths | Cancel / disconnect / timeout |

Pair with `wax-social-recovery-and-key-backup-tools` and multi-sig blueprints.

## License

MIT — **Pixel Journey**
