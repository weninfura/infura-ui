import { map, reduce, find, maxBy } from 'lodash';

const initialState = {
  today: [],
  past_14: [],
};

const formatAnalyticsResult = result => {
  const dateKeys = map(result[0].result, item => item.ts);
  const collector = reduce(
    dateKeys,
    (pivot, key) => {
      const dataPoint = map(result, item => ({
        projectId: item.query.for.public_key[0],
        value: Number(find(item.result, ['ts', key]).value),
      }));
      return Object.assign(pivot, { [key]: dataPoint });
    },
    {},
  );
  return Object.entries(collector);
};

export default (state = initialState, action) => {
  let formattedResult = [];
  switch (action.type) {
    case 'SUCCESS_USAGE':
      formattedResult = formatAnalyticsResult(action.data.payload);
      return {
        ...state,
        past_14: formattedResult,
        today: maxBy(formattedResult, o => o[0]),
      };
    case 'FAIL_USAGE':
    case 'FETCH_USAGE':
    default:
      return state;
  }
};
