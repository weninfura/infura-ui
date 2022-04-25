import React from 'react';
import PropTypes from 'prop-types';
import bytes from 'bytes';
import { VictoryArea, VictoryChart, VictoryAxis, VictoryVoronoiContainer } from 'victory';
import ContainerDimensions from 'react-container-dimensions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from './victoryTheme';
import getDateString from './getDateString';
import Tooltip from './Tooltip';

const BandwidthUsage = ({ data, error, periodType, period, project }) => {
  const fetching = data.length === 0 && !error;

  let peakUsageAndUnit = 0;
  let averageUsageAndUnit = 0;

  if (!fetching) {
    const peakUsage = Math.max(...data.map(d => d.value));
    peakUsageAndUnit = bytes(peakUsage, { unitSeparator: '-' }).split('-');

    const averageUsage = data.reduce((acc, d) => acc + Number(d.value), 0) / data.length;
    averageUsageAndUnit = bytes(averageUsage, { unitSeparator: '-' }).split('-');
  }

  return (
    <section className="column is-6">
      <section className="card metric-card has-floating-header">
        <header className="card-header">
          <h2 className="card-title">Bandwidth Usage</h2>
          <div className="info-tooltip has-margin-left is-hidden-mobile">
            <FontAwesomeIcon icon={['fal', 'info-circle']} />
            <div className="tooltip is-right">
              Peak and average hourly bandwidth usage for requests to Infura from {project} over the{' '}
              <span className="is-lowercase">{period}</span>.
            </div>
          </div>
        </header>
        <section className="card-main has-graph-full">
          <header className="columns graph-header">
            <div className="column">
              <h3 className="text-label">
                <div className="legend-line has-bg-primary" />
                Peak Usage
              </h3>
              <span className="metric-number">
                {peakUsageAndUnit[0]}
                <span className="metric-notation is-same-line">{peakUsageAndUnit[1]}</span>
              </span>
            </div>
            <div className="column">
              <h3 className="text-label">
                <div className="legend-line has-bg-primary" />
                Avg. Usage
              </h3>
              <span className="metric-number">
                {averageUsageAndUnit[0]}
                <span className="metric-notation is-same-line">{averageUsageAndUnit[1]}</span>
              </span>
            </div>
          </header>
          <section className="graph-body bandwidth-usage-graph">
            {!fetching && (
              <ContainerDimensions>
                {({ width, height }) => (
                  <VictoryChart
                    width={width}
                    height={height}
                    padding={{ top: 10 }}
                    domainPadding={{ y: 45 }}
                    theme={theme}
                    containerComponent={
                      <VictoryVoronoiContainer
                        labelComponent={Tooltip}
                        labels={({ datum: d }) => `${getDateString(data[d._x].ts, periodType)}
${bytes(Number(d._y))}`}
                      />
                    }
                  >
                    <VictoryArea
                      style={{
                        data: {
                          fill: '#ff6b4a',
                          stroke: '#ff6b4a',
                        },
                      }}
                      data={data.map(d => d.value)}
                    />
                    <VictoryAxis
                      dependentAxis
                      domain={[5, 0]}
                      offsetX={90}
                      style={{ grid: { stroke: '#d4d4d4' } }}
                      tickFormat={t => bytes(t, { unitSeparator: ' ' })}
                    />
                    <VictoryAxis
                      offsetY={40}
                      tickFormat={t =>
                        new Date(data[t].ts).toLocaleString(
                          'en-us',
                          periodType === 'DAY' ? { hour: 'numeric' } : { day: 'numeric', month: 'short' },
                        )
                      }
                    />
                  </VictoryChart>
                )}
              </ContainerDimensions>
            )}
          </section>
        </section>
      </section>
    </section>
  );
};
BandwidthUsage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ts: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  error: PropTypes.bool.isRequired,
  periodType: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
};

export default BandwidthUsage;
