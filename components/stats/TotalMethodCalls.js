import React from 'react';
import PropTypes from 'prop-types';
import { VictoryArea, VictoryChart, VictoryAxis, VictoryVoronoiContainer } from 'victory';
import ContainerDimensions from 'react-container-dimensions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoader from '../PageLoader';
import numberWithCommas from '../../utils/numberWithCommas';
import getDiffPercentage from '../../utils/getDiffPercentage';
import theme from './victoryTheme';
import getDateString from './getDateString';
import Tooltip from './Tooltip';

const addValues = (acc, d) => Number(d.value) + acc;

const TotalMethodCalls = ({ data, error, periodType, period, project }) => {
  const fetching = data.length === 0 && !error;

  const currPeriod = data.slice(data.length / 2);
  const prevPeriod = data.slice(0, data.length / 2);

  const totalCurrCalls = currPeriod.reduce(addValues, 0);
  const totalPrevCalls = prevPeriod.reduce(addValues, 0);

  const percentChange = getDiffPercentage(totalPrevCalls, totalCurrCalls);

  return (
    <section className="column is-12">
      <section className="card metric-card total-methods-card">
        <section className="card-main has-graph-full">
          <header className="columns graph-header">
            <div className="column">
              <h2 className="text-label" data-testid="stats-total-method-calls-header">
                Total Method Calls
              </h2>
              <span className="metric-number">
                {!fetching && (
                  <React.Fragment>
                    {numberWithCommas(totalCurrCalls)}
                    <span className="metric-notation is-same-line">
                      {percentChange !== 0 && (
                        <React.Fragment>
                          {percentChange > 0 ? (
                            <FontAwesomeIcon icon={['fal', 'arrow-up']} />
                          ) : (
                            <FontAwesomeIcon icon={['fal', 'arrow-down']} />
                          )}
                          <i
                            className={`fas ${
                              percentChange > 0 ? 'fa-arrow-up has-color-green' : 'fa-arrow-down has-color-red'
                            }`}
                          />
                          {percentChange}%
                        </React.Fragment>
                      )}
                    </span>
                  </React.Fragment>
                )}
              </span>
            </div>
            <div className="column graph-legend">
              <div className="graph-legend-item">
                <span className="legend-line has-bg-primary" />
                <span className="text-label">
                  {periodType === 'DAY' && 'Last 24 Hours'}
                  {(periodType === 'MONTH' || periodType === 'WEEK') &&
                    `${getDateString(currPeriod[0].ts)} - ${getDateString(currPeriod[currPeriod.length - 1].ts)}`}
                </span>
              </div>
              <div className="graph-legend-item">
                <span className="legend-line has-bg-secondary" />
                <span className="text-label">
                  {periodType === 'DAY' && '24 Hours Before Last'}
                  {(periodType === 'MONTH' || periodType === 'WEEK') &&
                    `${getDateString(prevPeriod[0].ts)} - ${getDateString(prevPeriod[prevPeriod.length - 1].ts)}`}
                </span>
              </div>
              <div className="info-tooltip has-margin-left is-hidden-mobile">
                <FontAwesomeIcon icon={['fal', 'info-circle']} />
                <div className="tooltip is-left">
                  Daily requests to Infura from&nbsp;
                  <span className="is-titlecase">{project}</span> over the&nbsp;
                  <span className="is-lowercase">{period}</span>.
                </div>
              </div>
            </div>
          </header>
          <section className="graph-body">
            {fetching ? (
              <PageLoader />
            ) : (
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
                        labels={({ datum: d }) => {
                          let periodHover = currPeriod;
                          if (d.childName === 'previous') {
                            periodHover = prevPeriod;
                          }
                          return `${getDateString(periodHover[d._x].ts, periodType)}
${numberWithCommas(d._y)}`;
                        }}
                      />
                    }
                  >
                    <VictoryArea
                      name="current"
                      style={{
                        data: {
                          fill: '#ff6b4a',
                          stroke: '#ff6b4a',
                        },
                      }}
                      data={currPeriod.map(d => d.value)}
                    />
                    <VictoryArea
                      name="previous"
                      style={{
                        data: {
                          fill: '#47a8bd',
                          stroke: '#47a8bd',
                        },
                      }}
                      data={prevPeriod.map(d => d.value)}
                    />
                    <VictoryAxis
                      dependentAxis
                      domain={[5, 0]}
                      offsetX={90}
                      style={{ grid: { stroke: '#d4d4d4' } }}
                      tickFormat={t => t.toFixed(0)}
                    />
                    <VictoryAxis
                      offsetY={40}
                      tickCount={10}
                      tickFormat={t => getDateString(currPeriod[t].ts, periodType)}
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

TotalMethodCalls.propTypes = {
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

export default TotalMethodCalls;
