/**
 * Decision-type inputs that mention zero runway for testing (numeric or spelled out).
 */
export function hasRunwayZeroConstraint(input: string): boolean {
  const t = input.toLowerCase();
  return t.includes("0 months") || /\bzero\s+months\b/.test(t);
}
