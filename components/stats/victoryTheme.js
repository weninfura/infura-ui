import { assign } from 'lodash';

// *
// * Colors
// *
const colors = ['#252525', '#525252', '#737373', '#969696', '#bdbdbd', '#d9d9d9', '#f0f0f0'];

const charcoal = '#252525';
const grey = '#969696';

const medgray = '#666666';
const orange = '#ff6b4a';
const black = '#000000';
const white = '#ffffff';

// *
// * Typography
// *
const sansSerif = "'Lineto Akkuratmono Regular', sans-serif";
const letterSpacing = 'normal';
const fontSize = '12px';
// *
// * Layout
// *
const baseProps = {
  width: 450,
  height: 300,
  padding: 50,
  colorScale: colors,
};
// *
// * Labels
// *
const baseLabelStyles = {
  fontFamily: sansSerif,
  fontSize,
  letterSpacing,
  padding: 8,
  fill: medgray,
  stroke: 'transparent',
};

const centeredLabelStyles = assign({ textAnchor: 'middle' }, baseLabelStyles);
// *
// * Strokes
// *
const strokeLinecap = 'round';
const strokeLinejoin = 'round';

export default {
  area: assign(
    {
      style: {
        data: {
          fill: charcoal,
          fillOpacity: 0.25,
          strokeWidth: 4,
        },
        labels: centeredLabelStyles,
      },
    },
    baseProps,
  ),
  axis: assign(
    {
      style: {
        axis: {
          fill: 'transparent',
          stroke: 'transparent',
          strokeWidth: 1,
          strokeLinecap,
          strokeLinejoin,
        },
        axisLabel: assign({}, centeredLabelStyles, {
          padding: 25,
        }),
        grid: {
          fill: 'none',
          stroke: 'transparent',
          pointerEvents: 'painted',
          strokeDasharray: '2,4',
        },
        ticks: {
          fill: 'transparent',
          size: 1,
          stroke: 'transparent',
        },
        tickLabels: baseLabelStyles,
      },
    },
    baseProps,
  ),
  bar: assign(
    {
      style: {
        data: {
          fill: orange,
          padding: 4,
          strokeWidth: 0,
        },
        labels: baseLabelStyles,
      },
      barRatio: 1,
      cornerRadius: 3,
    },
    baseProps,
  ),
  boxplot: assign(
    {
      style: {
        max: { padding: 8, stroke: charcoal, strokeWidth: 1 },
        maxLabels: baseLabelStyles,
        median: { padding: 8, stroke: charcoal, strokeWidth: 1 },
        medianLabels: baseLabelStyles,
        min: { padding: 8, stroke: charcoal, strokeWidth: 1 },
        minLabels: baseLabelStyles,
        q1: { padding: 8, fill: grey },
        q1Labels: baseLabelStyles,
        q3: { padding: 8, fill: grey },
        q3Labels: baseLabelStyles,
      },
      boxWidth: 20,
    },
    baseProps,
  ),
  candlestick: assign(
    {
      style: {
        data: {
          stroke: orange,
          strokeWidth: 1,
        },
        labels: centeredLabelStyles,
      },
      candleColors: {
        positive: white,
        negative: charcoal,
      },
    },
    baseProps,
  ),
  chart: baseProps,
  errorbar: assign(
    {
      borderWidth: 8,
      style: {
        data: {
          fill: 'transparent',
          stroke: charcoal,
          strokeWidth: 2,
        },
        labels: centeredLabelStyles,
      },
    },
    baseProps,
  ),
  group: assign(
    {
      colorScale: colors,
    },
    baseProps,
  ),
  legend: {
    colorScale: colors,
    gutter: 10,
    orientation: 'vertical',
    titleOrientation: 'top',
    style: {
      data: {
        type: 'circle',
      },
      labels: baseLabelStyles,
      title: assign({}, baseLabelStyles, { padding: 5 }),
    },
  },
  line: assign(
    {
      style: {
        data: {
          fill: 'transparent',
          stroke: orange,
          strokeWidth: 2,
        },
        labels: centeredLabelStyles,
      },
    },
    baseProps,
  ),
  pie: {
    style: {
      data: {
        padding: 10,
        stroke: 'transparent',
        strokeWidth: 0,
      },
      labels: assign({}, baseLabelStyles, {
        fontSize: 20,
        fill: 'transparent',
      }),
    },
    colorScale: colors,
    width: 400,
    height: 400,
    padding: 50,
  },
  scatter: assign(
    {
      style: {
        data: {
          fill: charcoal,
          stroke: 'transparent',
          strokeWidth: 0,
        },
        labels: centeredLabelStyles,
      },
    },
    baseProps,
  ),
  stack: assign(
    {
      colorScale: colors,
    },
    baseProps,
  ),
  tooltip: {
    style: assign({}, centeredLabelStyles, {
      padding: 16,
      pointerEvents: 'none',
      fill: white,
    }),
    flyoutStyle: {
      stroke: 'transparent',
      strokeWidth: 0,
      fill: black,
      pointerEvents: 'none',
    },
    cornerRadius: 3,
    pointerLength: 8,
    pointerWidth: 16,
  },
  voronoi: assign(
    {
      style: {
        data: {
          fill: 'transparent',
          stroke: 'transparent',
          strokeWidth: 0,
        },
        labels: assign({}, centeredLabelStyles, { padding: 5, pointerEvents: 'none' }),
        flyout: {
          stroke: charcoal,
          strokeWidth: 1,
          fill: '#f0f0f0',
          pointerEvents: 'none',
        },
      },
    },
    baseProps,
  ),
};
