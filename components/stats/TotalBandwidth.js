import React from 'react';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';
import ContainerDimensions from 'react-container-dimensions';
import bytes from 'bytes';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import theme from './victoryTheme';
import Tooltip from './Tooltip';

const TotalBandwidth = ({ data, error, periodType, period, project }) => {
  const fetching = data.length === 0 && !error;
  const chunkedData = !fetching
    ? chunk(data, data.length / 4).map(group => ({
        start: new Date(group[0].ts),
        total: group.reduce((acc, datum) => acc + Number(datum.value), 0),
      }))
    : [];

  const latestPeriod = bytes(data[data.length - 1] ? Number(data[data.length - 1].value) : 0, {
    unitSeparator: '-',
  }).split('-');

  return (
    <section className="column is-half-tablet is-one-quarter-widescreen">
      <section className="card metric-card has-floating-header">
        <header className="card-header">
          <h2 className="card-title">Total Bandwidth</h2>
          <div className="info-tooltip has-margin-left is-hidden-mobile">
            <FontAwesomeIcon icon={['fal', 'info-circle']} />
            <div className="tooltip is-left">
              Requests to Infura from {project} that used the most bandwidth over the&nbsp;
              <span className="is-lowercase">{period}</span>.
            </div>
          </div>
        </header>
        <section className="card-main has-graph-full">
          <header className="graph-header">
            <h3 className="text-label">
              <div className="legend-line has-bg-primary" />
              {periodType === 'DAY' && 'Last 24 Hours'}
              {periodType === 'WEEK' && 'Last 7 Days'}
              {periodType === 'MONTH' && 'Last 30 Days'}
              {periodType === 'YEAR' && 'Last 3 Months'}
            </h3>
            <span className="metric-number">
              {!fetching && (
                <React.Fragment>
                  {latestPeriod[0]}
                  <span className="metric-notation is-same-line has-percentage">{latestPeriod[1]}</span>
                </React.Fragment>
              )}
            </span>
          </header>
          <section className="graph-body">
            {!fetching && (
              <ContainerDimensions>
                {({ width, height }) => (
                  <VictoryChart
                    height={height}
                    width={width}
                    scale={{ x: 'time' }}
                    domainPadding={{ x: [60, 0] }}
                    theme={theme}
                  >
                    <VictoryAxis
                      tickValues={chunkedData.map(d => d.start)}
                      tickFormat={t => {
                        if (periodType === 'MONTH') {
                          return t.toLocaleString('en-us', { month: 'short' });
                        }

                        return t.toLocaleString('en-us', { day: 'numeric', month: 'short' });
                      }}
                    />
                    <VictoryAxis dependentAxis offsetX={90} tickFormat={t => bytes(t, { unitSeparator: ' ' })} />
                    <VictoryBar
                      labelComponent={Tooltip}
                      style={{
                        data: {
                          fill: ({ eventKey }) => {
                            if (eventKey !== chunkedData.length - 1) {
                              return '#47a8bd';
                            }

                            return '#ff6b4a';
                          },
                        },
                      }}
                      data={chunkedData.map(d => ({
                        x: d.start,
                        y: d.total,
                        label: bytes(d.total),
                      }))}
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

TotalBandwidth.defaultProps = {
  error: false,
};

TotalBandwidth.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  error: PropTypes.bool,
  period: PropTypes.string.isRequired,
  periodType: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
};

export default TotalBandwidth;
