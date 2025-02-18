import { AIR_QUALITY_BRIEFS, DEFAULT_BRIEF, MAX_AIR_QUALITY_INDEX, MIN_AIR_QUALITY_INDEX } from "./constants";

/**
 * Returns a brief description of the air quality based on the given index.
 *
 * @param index
 * @returns brief description of the air quality
 */
export function getAQIBrief(index: number): string {
  // calculate clamped index value
  const clampedIndex = Math.max(MIN_AIR_QUALITY_INDEX, Math.min(index, MAX_AIR_QUALITY_INDEX));

  // determine quality brief
  const briefIndex = Math.floor(clampedIndex / 100);

  return AIR_QUALITY_BRIEFS[briefIndex] ?? DEFAULT_BRIEF;
}
