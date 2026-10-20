/**
 * Educational device / session error matrix for hardware signing UX.
 */

export type ErrorSeverity = "info" | "recoverable" | "blocking";

export interface SigningErrorCase {
  id: string;
  title: string;
  trigger: string;
  severity: ErrorSeverity;
  userMessage: string;
  appShould: string;
}

export const SIGNING_ERROR_MATRIX: SigningErrorCase[] = [
  {
    id: "user-cancel",
    title: "User cancelled on device",
    trigger: "Reject / cancel on hardware",
    severity: "info",
    userMessage: "Signature cancelled. Nothing was sent to the chain.",
    appShould: "Return to preview; do not auto-retry.",
  },
  {
    id: "disconnect",
    title: "Device disconnected",
    trigger: "USB/Bluetooth drop mid-sign",
    severity: "recoverable",
    userMessage: "Hardware disconnected. Reconnect and try again.",
    appShould: "Clear pending session state; offer reconnect.",
  },
  {
    id: "timeout",
    title: "Device prompt timed out",
    trigger: "No confirm within timeout",
    severity: "recoverable",
    userMessage: "The device did not respond in time.",
    appShould: "Abort cleanly; allow manual retry once.",
  },
  {
    id: "app-closed",
    title: "Wallet app not open",
    trigger: "Ledger/app not on Antelope screen",
    severity: "recoverable",
    userMessage: "Open the correct app on your device, then retry.",
    appShould: "Show checklist; link vendor docs offline in your runbook.",
  },
  {
    id: "wrong-chain",
    title: "Unexpected chain / account",
    trigger: "Session actor or chain id mismatch",
    severity: "blocking",
    userMessage: "This session does not match the account you intended.",
    appShould: "Hard stop until user re-selects account.",
  },
  {
    id: "blind-payload",
    title: "Preview missing",
    trigger: "UI would sign without summary",
    severity: "blocking",
    userMessage: "Refusing to sign without a readable preview.",
    appShould: "Never call transact until preview is confirmed.",
  },
];

export function errorsBySeverity(
  severity: ErrorSeverity
): SigningErrorCase[] {
  return SIGNING_ERROR_MATRIX.filter((e) => e.severity === severity);
}

export function findErrorCase(id: string): SigningErrorCase | undefined {
  return SIGNING_ERROR_MATRIX.find((e) => e.id === id);
}
