import {
  AIR_QUALITY_BRIEFS,
  DEFAULT_BRIEF,
  KEYWORD_MAPPINGS,
  MAX_AIR_QUALITY_INDEX,
  MIN_AIR_QUALITY_INDEX,
} from "../utils/constants";

/**
 * Returns a brief description of the air quality based on the given index.
 *
 * @param index
 * @returns brief description of the air quality
 */
export function getAQIBrief(index: number): string {
  if (index <= 0) return DEFAULT_BRIEF;

  // calculate clamped index value
  const clampedIndex = Math.max(MIN_AIR_QUALITY_INDEX, Math.min(index, MAX_AIR_QUALITY_INDEX));

  return AIR_QUALITY_BRIEFS[clampedIndex] ?? DEFAULT_BRIEF;
}

export function getSingleWordCondition(description: string) {
  description = description.toLowerCase();
  for (const mapping of KEYWORD_MAPPINGS) {
    if (description.includes(mapping.keyword)) {
      return mapping.condition;
    }
  }
  return "Unknown";
}
