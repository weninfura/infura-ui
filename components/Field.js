import React from 'react';
import { Text, TextArea } from 'react-form';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ServerError from './ServerError';

const Field = ({
  name,
  type,
  label,
  errors,
  labelIsHidden,
  isOnBlack,
  placeholder,
  serverError,
  handleBlur,
  handleFocus,
}) => {
  const hasError = errors && errors[name];

  return (
    <div className="field">
      <label htmlFor={name} className={classNames('label', { 'is-hidden': labelIsHidden })}>
        {label || name}
      </label>
      {type === 'textarea' ? (
        <TextArea
          field={name}
          id={name}
          className={classNames('textarea', {
            'is-danger': hasError,
            'is-on-black': isOnBlack,
          })}
          data-testid={name}
        />
      ) : (
        <Text
          field={name}
          type={type}
          id={name}
          className={classNames('input', {
            'is-danger': hasError,
            'is-on-black': isOnBlack,
          })}
          placeholder={placeholder}
          data-testid={name}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      )}
      {hasError && <div className="has-text-danger">{errors[name]}</div>}
      {serverError && <ServerError serverError={serverError} />}
    </div>
  );
};

Field.defaultProps = {
  label: '',
  labelIsHidden: false,
  isOnBlack: false,
  placeholder: '',
  serverError: '',
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string,
  errors: PropTypes.shape({}).isRequired,
  labelIsHidden: PropTypes.bool,
  isOnBlack: PropTypes.bool,
  placeholder: PropTypes.string,
  serverError: PropTypes.string,
  handleBlur: PropTypes.func,
  handleFocus: PropTypes.func,
};

export default Field;
