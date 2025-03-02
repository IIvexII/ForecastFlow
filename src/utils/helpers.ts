export function normalizePostion(min: number, max: number, postion: number): number {
  "worklet";
  return (postion - min) / (max - min);
}
