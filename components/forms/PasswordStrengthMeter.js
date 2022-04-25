import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PasswordStrengthMeter = ({ passwordValue, focused }) => {
  const requirements = [
    {
      description: 'At least 8 characters in length',
      isSatisfied: passwordValue.length >= 8,
    },
    {
      description: 'Contain upper and lower case characters',
      isSatisfied: passwordValue.match(/[a-z]/) && passwordValue.match(/[A-Z]/),
    },
    {
      description: 'At least one numerical character',
      isSatisfied: passwordValue.match(/[0-9]/),
    },
    {
      description: 'At least one special character',
      isSatisfied: passwordValue.match(/[^\w\s]/),
    },
  ];
  let strength = 0;
  requirements.forEach((requirement, i) => {
    strength += requirement.isSatisfied ? 1 : 0;
  });
  const wrapperClass = classNames('field', 'strength-meter-wrapper', {
    'is-visible': focused,
  });

  return (
    <div className={wrapperClass}>
      <div className="strength-meter mt-2" data-for="pswd-requirements" data-tip="tooltip">
        <div className="strength-meter-fill" data-strength={strength}></div>
      </div>
      <span className="tooltip is-right">
        <header className="tooltip-header">
          <span className="tooltip-label">Password Strength</span>
        </header>
        <section className="tooltip-content">
          {requirements.map((requirement, i) => {
            return (
              <div className="strength-requirement" key={i}>
                <FontAwesomeIcon
                  icon={['fa', requirement.isSatisfied ? 'check-circle' : 'times-circle']}
                  className={
                    requirement.isSatisfied
                      ? 'has-color-green has-margin-right-smallest'
                      : 'has-color-red has-margin-right-smallest'
                  }
                />
                {requirement.description}
              </div>
            );
          })}
        </section>
      </span>
    </div>
  );
};

PasswordStrengthMeter.defaultProps = {
  passwordValue: '',
  focused: false,
};

PasswordStrengthMeter.propTypes = {
  passwordValue: PropTypes.string.isRequired,
  focused: PropTypes.bool.isRequired,
};

export default PasswordStrengthMeter;
