import { orderBy } from 'lodash';

const getTopValues = (data, amount) => {
  const dataValueToNumber = data.map(d => ({ ...d, value: Number(d.value) }));
  const descValueData = orderBy(dataValueToNumber, ['value'], ['desc']);
  const trimmedData = descValueData.slice(0, amount);

  return trimmedData;
};

export default getTopValues;
