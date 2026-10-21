/**
 * Educational types for hardware wallet integration readiness.
 */

export interface HardwareIntegrationPosture {
  /** Keys never leave the device into the web page */
  noSeedInBrowser: boolean;
  /** Owner key reserved for rare authority changes */
  ownerNotUsedDaily: boolean;
  /** UI shows action summary before device prompt */
  clearTxPreview: boolean;
  /** Second recovery path exists (backup and/or multi-sig) */
  secondaryRecoveryPath: boolean;
  /** Cancel / disconnect / timeout paths handled */
  errorPathsHandled: boolean;
}

export type RiskLevel = "low" | "medium" | "high";

export interface IntegrationPitfall {
  id: string;
  level: RiskLevel;
  title: string;
  detail: string;
  trigger: string;
}

export interface ChecklistItem {
  id: string;
  passed: boolean;
  label: string;
  detail: string;
}

export interface ReadinessScore {
  score: number;
  items: ChecklistItem[];
}
