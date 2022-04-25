import React from 'react';
import { VictoryTooltip } from 'victory';

const Tooltip = (
  <VictoryTooltip
    cornerRadius={3}
    flyoutStyle={{
      fill: '#000',
    }}
    pointerLength={8}
    pointerWidth={16}
    style={{
      fill: '#fff',
      fontFamily: "'Lineto Akkuratmono Regular', sans-serif",
      padding: 10,
    }}
  />
);

export default Tooltip;
