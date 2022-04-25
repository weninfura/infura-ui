export default function getDiffPercentage(prev, curr) {
  const p = Number(prev);
  const c = Number(curr);
  const absDiff = Math.abs(p - c);

  if (p === 0 || c === 0) return 0;

  // percentage decrease from previous amount
  if (p > c) {
    return -((absDiff / p) * 100).toFixed(2);
  }

  // percentage increase from previous amount
  return ((absDiff / c) * 100).toFixed(2);
}
