const getDateString = (ts, periodType = 'MONTH') => {
  let dateDisplayOptions;
  if (periodType === 'DAY') dateDisplayOptions = { hour: 'numeric' };
  if (periodType === 'MONTH') dateDisplayOptions = { day: 'numeric', month: 'short' };
  if (periodType === 'YEAR') dateDisplayOptions = { day: 'numeric', month: 'short', year: 'numeric' };

  return new Date(ts).toLocaleString('en-us', dateDisplayOptions);
};

export default getDateString;
