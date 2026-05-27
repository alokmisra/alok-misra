// ─────────────────────────────────────────────────────────────────────────────
//  portfolio.ts  –  Aggregated single source-of-truth for Dr. Alok Misra
//  Assembles sub-modules for modular maintenance.
// ─────────────────────────────────────────────────────────────────────────────

import { general } from "./general";
import { experience } from "./experience";
import { publications } from "./publications";
import { guidance } from "./guidance";

export const professor = {
  ...general,
  experience,
  publications,
  guidance,
} as const;
