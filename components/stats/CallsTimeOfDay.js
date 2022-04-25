import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { times, groupBy } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import numberWithCommas from '../../utils/numberWithCommas';
import { WEEKDAYS } from '../../constants';

const pad = num => num.toString().padStart(2, '0');
const getDateString = date => `${date.getFullYear()}${pad(date.getMonth())}${pad(date.getDate())}`;

const colors = ['#ffe81a', '#ffbd00', '#ffa000', '#fc7f00'];

const getHex = (hourAmount, highRange) => {
  const percent = hourAmount / highRange;
  if (percent < 0.25) return colors[0];
  if (percent < 0.5) return colors[1];
  if (percent < 0.75) return colors[2];
  return colors[3];
};

const getRoundedNumbers = highRange => {
  const steps = [highRange * 0.25, highRange * 0.5, highRange * 0.75, highRange];

  if (steps[0] < 100) {
    return steps.map(step => step.toFixed(0));
  }

  let roundTo = 10;
  if (steps[0] > 1000) roundTo = 100;
  if (steps[0] > 10000) roundTo = 1000;

  return steps.map(step => (Math.ceil(step / roundTo) * roundTo).toFixed(0));
};

class CallsTimeOfDay extends PureComponent {
  constructor(props) {
    super(props);

    this.getDays = this.getDays.bind(this);
  }

  getDays() {
    const { data } = this.props;
    let highRange = 0; // used to establish a high range for the color gradient

    /*
      make a matrix of 7 days:
      [ 0: { date, dateString, hours: [0 - 23] }, ... 7: { ... }]

      the 'hours' array starts with a value of -1 for each hour
    */
    let days = times(7, dayIdx => {
      const date = new Date();
      date.setDate(date.getDate() - dayIdx);
      return {
        date,
        dateString: getDateString(date),
        hours: times(24, () => -1),
      };
    });

    // if there's data...
    if (data.length > 0) {
      // format each of the values
      const formattedData = data.map(({ ts, value }) => {
        const date = new Date(ts);

        return {
          dateString: getDateString(date),
          hour: date.getHours(),
          value,
        };
      });

      // group the formatted values by day
      // ex { 20181010: [ ... ], 20181011: [ ... ], ...}
      const groupedData = groupBy(formattedData, ({ dateString }) => dateString);

      // map the grouped data over the matrix above and replace the -1
      // with any known value for particular hour
      days = days.map(day => {
        if (day.dateString in groupedData) {
          const dayData = groupedData[day.dateString];

          dayData.forEach(hourDatum => {
            const value = parseInt(hourDatum.value, 10);

            if (value > highRange) {
              highRange = value;
            }

            day.hours[hourDatum.hour] = value;
          });
        }
        return day;
      });
    }

    return { days, highRange };
  }

  render() {
    const { days, highRange } = this.getDays();
    const { period, project } = this.props;

    const steps = getRoundedNumbers(highRange);

    return (
      <section className="column is-half-tablet is-one-quarter-widescreen">
        <section className="card metric-card has-floating-header">
          <header className="card-header">
            <h2 className="card-title">Calls by Time of Day</h2>
            <div className="info-tooltip has-margin-left is-hidden-mobile">
              <FontAwesomeIcon icon={['fal', 'info-circle']} />
              <div className="tooltip is-right">
                Heat map of hourly requests sent to Infura from {project} over the&nbsp;
                <span className="is-lowercase">{period}</span>.
              </div>
            </div>
          </header>
          <section className="card-main">
            <ul className="graph-heatmap">
              {days.reverse().map(day => (
                <li className="graph-heatmap-column" key={`calls-time-${day.dateString}`}>
                  <ul>
                    {day.hours.map((hourAmount, hourIdx) => (
                      <li
                        className="graph-heatmap-rect blank"
                        style={
                          hourAmount >= 1
                            ? {
                                backgroundColor: getHex(hourAmount, highRange),
                              }
                            : {}
                        }
                        key={`calls-time-${day.dateString}-${hourIdx}`}
                      >
                        <span className="tooltip is-top">
                          <header className="tooltip-header">
                            <span className="tooltip-label">
                              {day.date.toLocaleString('en-us', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                              })}
                              &nbsp;
                              {hourIdx}:00
                            </span>
                          </header>
                          <section className="tooltip-content">
                            <span className="tooltip-label">Method Calls</span>
                            <span className="tooltip-data">{hourAmount > 0 ? numberWithCommas(hourAmount) : 0}</span>
                          </section>
                        </span>
                      </li>
                    ))}
                    <li
                      className="graph-heatmap-rect column-day-label"
                      key={`calls-day-${WEEKDAYS[day.date.getDay()]}`}
                    >
                      {WEEKDAYS[day.date.getDay()]}
                    </li>
                  </ul>
                </li>
              ))}
              <li className="graph-heatmap-column column-time">
                <ul>
                  {times(24, hour => (
                    <li className="graph-heatmap-rect column-time-label" key={`calls-time-${hour}`}>
                      {hour % 2 === 0 ? hour : ''}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <ul className="graph-heatmap-legend">
              <li className="graph-heatmap-rect" style={{ backgroundColor: colors[0] }}>
                <span className="stats-calls-legend-num">{numberWithCommas(steps[0])}</span>
              </li>
              <li className="graph-heatmap-rect" style={{ backgroundColor: colors[1] }}>
                <span className="stats-calls-legend-num">{numberWithCommas(steps[1])}</span>
              </li>
              <li className="graph-heatmap-rect" style={{ backgroundColor: colors[2] }}>
                <span className="stats-calls-legend-num">{numberWithCommas(steps[2])}</span>
              </li>
              <li className="graph-heatmap-rect" style={{ backgroundColor: colors[3] }}>
                <span className="stats-calls-legend-num">{numberWithCommas(steps[3])}</span>
              </li>
            </ul>
          </section>
        </section>
      </section>
    );
  }
}

CallsTimeOfDay.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ts: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  period: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
};

export default CallsTimeOfDay;
