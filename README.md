# wax-hardware-wallet-integration-patterns

> **Status:** 🔄 Deep Refinement (PX Perfection Standard v1.1)  
> **Category:** Security & Hardware Wallets  
> **Parent Catalog:** [wax-ecosystem-blueprint-catalog](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog)

**Goal:** Educational, practical patterns for integrating **hardware wallets** with Antelope/WAX accounts — permission design, signing UX, multi-sig co-signer use, and common pitfalls. Device SDKs change; **invariants and UX principles** are the durable layer.

---

## Vision

Hardware wallets reduce software-key exposure. Bad integration reintroduces risk (wrong permission, unclear prompts, keys handled in the browser). This blueprint focuses on:

- **Owner vs active** discipline
- **Clear device prompts** users can actually read
- **Multi-sig + hardware** without single-device fantasy security
- **Runbooks** that work if a dApp domain disappears (PX §11)

---

## Quick Starts

### Humans
1. Read §1 (permission + signing pitfalls).
2. Use `/examples` — readiness score, pitfalls, signing steps, permission patterns, demo.
3. Pair with multi-sig and social-recovery blueprints for high-value accounts.

### AI agents
1. Load `spec.yaml`.
2. Use pure readiness helpers; do not invent device APIs as permanent contracts.
3. Prefer WharfKit session patterns over custom key extraction.

---

## 1. Educational Core

### 1.1 Concepts

| Concept | Why it matters |
|---------|----------------|
| **Hardware holds keys** | Signing happens on device; host should not see seed |
| **Owner vs active** | Owner changes authority; active runs daily ops |
| **WharfKit / wallet session** | Standard path for Antelope dApps |
| **Co-signer in multi-sig** | Device is one weight, not magic immunity |
| **Prompt literacy** | Users must understand what the device shows |

### 1.2 Common pitfalls

| Pitfall | Risk | Direction |
|---------|------|-----------|
| Daily use of owner on device | One compromised flow can change authority | Keep owner rare/offline |
| Opaque signing UI | Users approve blindly | Show action summary before device |
| "Hardware" but keys exported once | Defeats the model | Never export seed into the page |
| Single hardware as only path | Device loss = lockout | Backup + multi-sig design |
| Relying only on a vendor tutorial site | Site can vanish | Keep setup steps in your repo |

### 1.3 Learning outcomes

- Design permission layouts for hardware users
- Implement calm, step-by-step signing UX
- Score integration readiness with a checklist
- Combine hardware with multi-sig without false confidence

---

## 2. Architecture

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 + TypeScript (strict) |
| Logic | Pure readiness / pitfall helpers |
| UI | Guide panels + signing step list |
| Runtime | WharfKit + vendor transports (version carefully) |

```
/examples/
  types.ts
  engines.ts
  PitfallsGuide.tsx
  ReadinessChecklist.tsx
  SigningFlowSteps.tsx
  PermissionPatterns.tsx
  demo.tsx
```

---

## 3. Integration levels

| Level | Scope |
|-------|--------|
| **Minimal** | Session connect + sign one action with clear copy |
| **Recommended** | Permission guidance + readiness checklist + error states |
| **Advanced** | Multi-sig weights with hardware co-signers, owner rotation drill |

---

## 4. Best practices

**Do** use the minimum permission required; preview txs; test disconnect and cancel paths.  
**Don’t** paste seeds into web forms; don’t treat one Ledger as a full backup plan.

---

## 5. Ecosystem position

Companion to:
- `wax-secure-key-management-and-privacy-tools`
- `wax-multi-sig-proposal-builder-and-simulator`
- `wax-social-recovery-and-key-backup-tools`
- `wax-safe-key-rotation-assistant`

---

## 6. License

MIT — **Pixel Journey**

*Exemplifies [PX Perfection Standard](https://github.com/pixel-journey/wax-ecosystem-blueprint-catalog/blob/main/PX-PERFECTION-STANDARD.md) v1.1.*

*Last major refinement pass: October 2026*
