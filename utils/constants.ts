export const DEGREE_SYMBOL = "°";

export const MAX_AIR_QUALITY_INDEX = 500;
export const MIN_AIR_QUALITY_INDEX = 0;

export const AIR_QUALITY_BRIEFS: Readonly<Record<number, string>> = {
  0: "Good",
  1: "Moderate",
  2: "Unhealthy for Sensitive Groups",
  3: "Unhealthy",
  4: "Very Unhealthy",
  5: "Hazardous",
} as const;

export const DEFAULT_BRIEF = "Unknown Health Risk";
