import { CHAIN_ORIGIN, active, getAccount } from "./api";
import { scoreHardwareReadiness } from "./engines";
import type { ChainAction, HttpRequest } from "./api";

export type UseCase = {
  title: string;
  detail: string;
  request: HttpRequest;
  transaction: { note: string; actions: ChainAction[] } | null;
};

const ready = scoreHardwareReadiness({
  noSeedInBrowser: true,
  ownerNotUsedDaily: true,
  clearTxPreview: true,
  secondaryRecoveryPath: true,
  errorPathsHandled: true,
});

export const USE_CASES: UseCase[] = [
  {
    title: "Whose permission the device would sign",
    detail: "get_account shows active and owner. The readiness score does not read it. A page that asks for a seed fails the checklist regardless of this response.",
    request: getAccount(CHAIN_ORIGIN, "alice"),
    transaction: null,
  },
  {
    title: "The transfer the device screen should show",
    detail: `Readiness score ${ready.score} when every posture flag is true. The action is the preview. This repo still has no wallet plugin installed.`,
    request: getAccount(CHAIN_ORIGIN, "bob"),
    transaction: {
      note: "Not broadcast. Show these fields before the device prompt. Do not put a seed in the page.",
      actions: [
        active("alice", {
          account: "eosio.token",
          name: "transfer",
          data: { from: "alice", to: "bob", quantity: "1.00000000 WAX", memo: "device preview" },
        }),
      ],
    },
  },
];

export function assertUseCases(): void {
  if (ready.score !== 100) throw new Error(`readiness ${ready.score}`);
}
