import React, { PureComponent } from 'react';
import { VictoryPie } from 'victory';
import PropTypes from 'prop-types';
import bytes from 'bytes';
import ContainerDimensions from 'react-container-dimensions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NoData from './NoData';
import getTopValues from './getTopValues';
import theme from './victoryTheme';
import getPercentage from '../../utils/getPercentage';

const colors = [
  { name: 'orange', color: '#ff6b4a' },
  { name: 'blue', color: '#2c89ef' },
  { name: 'purple', color: '#46237a' },
  { name: 'turquoise', color: '#47a8bd' },
  { name: 'dark-gray', color: '#333333' },
];

const calcInnerRadius = size => (size * 0.8) / 2;

class TopMethodCallsBandwidth extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      currentHover: -1,
    };

    this.setHover = this.setHover.bind(this);
  }

  setHover(index = -1) {
    this.setState({ currentHover: index });
  }

  render() {
    const { data, error, period, project } = this.props;
    const { currentHover } = this.state;

    const fetching = data.length === 0 && !error;

    const trimmedData = getTopValues(data, colors.length);

    const totalBandwidth = trimmedData.reduce((acc, cur) => cur.value + acc, 0);
    const totalAndUnit = bytes(totalBandwidth, { unitSeparator: '-' }).split('-');

    return (
      <section className="column is-6">
        <section className="card metric-card flex-card has-stretched-content has-floating-header">
          <header className="card-header">
            <h2 className="card-title">Top 5 Method Calls Bandwidth Usage</h2>
            <div className="info-tooltip has-margin-left is-hidden-mobile">
              <FontAwesomeIcon icon={['fal', 'info-circle']} />
              <div className="tooltip is-right">
                Requests to Infura that used the most bandwidth from {project}&nbsp; over the{' '}
                <span className="is-lowercase">{period}</span>.
              </div>
            </div>
          </header>
          <section className="card-main is-desktop">
            {data.length === 0 ? (
              <NoData />
            ) : (
              <div className="columns">
                <div className="column is-half-widescreen graph-circle is-hidden-tablet-only">
                  <div className="circle-center is-hidden-desktop-only">
                    {!fetching && (
                      <div>
                        <h3 className="text-label">Total Used</h3>
                        <span className="metric-number">
                          {totalAndUnit[0]}
                          <span className="metric-notation is-same-line">{totalAndUnit[1]}</span>
                        </span>
                      </div>
                    )}
                    {/*
                      <span className="metric-notation">
                        <i className="fas fa-arrow-up has-color-green" />
                        2%
                      </span>
                      */}
                  </div>
                  <ContainerDimensions>
                    {({ width, height }) => (
                      <VictoryPie
                        data={trimmedData.map(d => d.value)}
                        events={[
                          {
                            target: 'data',
                            eventHandlers: {
                              onMouseOver: () => [
                                {
                                  mutation: props => {
                                    this.setHover(props.index);
                                    return null;
                                  },
                                },
                              ],
                              onMouseOut: () => [{ mutation: () => this.setHover() }],
                            },
                          },
                        ]}
                        width={width}
                        height={height}
                        padding={0}
                        theme={theme}
                        innerRadius={width > height ? calcInnerRadius(height) : calcInnerRadius(width)}
                        colorScale={colors.map(c => c.color)}
                      />
                    )}
                  </ContainerDimensions>
                </div>
                <div className="column is-half-widescreen">
                  <ul className="graph-data-list">
                    {!fetching &&
                      trimmedData.map((d, i) => (
                        <li
                          className="graph-data"
                          key={`method-bandwidth-${d.label || '(blank)'}`}
                          style={currentHover === i ? { backgroundColor: '#f0f0f0' } : {}}
                        >
                          <div className="graph-legend-item">
                            <div className={`legend-circle is-${colors[i].name}`} />
                            <span className="graph-data-name">{d.label || '(blank)'}</span>
                          </div>
                          <div>
                            <span className="graph-data-item">{bytes(Number(d.value))}</span>
                            <span className="graph-data-item">{getPercentage(d.value, totalBandwidth)}%</span>
                            {/*
                                  <span className="graph-data-item">
                                    <i className="fas fa-arrow-up has-color-green" />
                                    2%
                                  </span>
                                */}
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </section>
      </section>
    );
  }
}

TopMethodCallsBandwidth.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  error: PropTypes.bool.isRequired,
  period: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
};

export default TopMethodCallsBandwidth;
