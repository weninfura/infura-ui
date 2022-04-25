export default brand => {
  if (brand === 'unknown' || typeof brand === 'undefined' || !brand) {
    return 'credit-card-blank';
  }

  const lowerCaseBrand = brand.toLowerCase();

  if (lowerCaseBrand === 'diners') {
    return 'cc-diners-club';
  }

  return `cc-${lowerCaseBrand}`;
};
