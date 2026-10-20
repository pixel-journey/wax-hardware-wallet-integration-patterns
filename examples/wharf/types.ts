/** Minimal session shape — optional WharfKit-compatible. */

export interface TransactArgs {
  actions: unknown[];
}

export interface TransactResult {
  transaction_id?: string;
  dryRun?: boolean;
  actions?: unknown[];
}

export interface SessionLike {
  actor: string | { toString(): string };
  permission?: string;
  transact(args: TransactArgs): Promise<TransactResult>;
}

export function actorString(session: SessionLike): string {
  return typeof session.actor === "string"
    ? session.actor
    : session.actor.toString();
}
