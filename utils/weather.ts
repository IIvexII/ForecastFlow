import {
  AIR_QUALITY_BRIEFS,
  DEFAULT_BRIEF,
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
