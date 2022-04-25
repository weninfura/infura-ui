export default [
  {
    type: 'DAY',
    name: 'Last 24 Hours',
    queries: [
      {
        query: 'timeseries',
        datapoint: 'count',
        time: {
          from: '48h',
          tick: 'h',
        },
      },
      {
        query: 'top10methods',
        datapoint: 'count',
        time: {
          from: '24h',
          tick: 'h',
        },
      },
      {
        query: 'top10methods',
        datapoint: 'bandwidth',
        time: {
          from: '24h',
          tick: 'h',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'count',
        time: {
          from: '168h',
          tick: 'h',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'bandwidth',
        time: {
          from: '24h',
          tick: 'h',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'bandwidth',
        time: {
          from: '96h',
          tick: 'h',
        },
      },
    ],
  },
  {
    type: 'WEEK',
    name: 'Last 7 Days',
    queries: [
      {
        query: 'timeseries',
        datapoint: 'count',
        time: {
          from: '336h',
          tick: 'h',
        },
      },
      {
        query: 'top10methods',
        datapoint: 'count',
        time: {
          from: '7d',
          tick: 'd',
        },
      },
      {
        query: 'top10methods',
        datapoint: 'bandwidth',
        time: {
          from: '7d',
          tick: 'd',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'count',
        time: {
          from: '168h',
          tick: 'h',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'bandwidth',
        time: {
          from: '6d',
          tick: 'd',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'bandwidth',
        time: {
          from: '27d',
          tick: 'd',
        },
      },
    ],
  },
  {
    type: 'MONTH',
    name: 'Last 30 Days',
    queries: [
      {
        query: 'timeseries',
        datapoint: 'count',
        time: {
          from: '59d',
          tick: 'd',
        },
      },
      {
        query: 'top10methods',
        datapoint: 'count',
        time: {
          from: '30d',
          tick: 'd',
        },
      },
      {
        query: 'top10methods',
        datapoint: 'bandwidth',
        time: {
          from: '30d',
          tick: 'd',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'count',
        time: {
          from: '168h',
          tick: 'h',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'bandwidth',
        time: {
          from: '29d',
          tick: 'd',
        },
      },
      {
        query: 'timeseries',
        datapoint: 'bandwidth',
        time: {
          from: '3m',
          tick: 'm',
        },
      },
    ],
  },
];
