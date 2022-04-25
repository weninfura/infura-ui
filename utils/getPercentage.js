const checkIsNumber = val => (Number.isNaN(val) ? Number(val) : val);

export default function getPercentage(x, y) {
  const xNum = checkIsNumber(x);
  const yNum = checkIsNumber(y);

  if (xNum === 0 || yNum === 0) return 0;

  return ((xNum / yNum) * 100).toFixed(2);
}
