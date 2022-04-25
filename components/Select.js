import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ children, ...props }) => (
  <select {...props}>
    {children.flat().map(child => {
      const childProps = child.props || {};
      return <option {...childProps}>{childProps.children ? childProps.children.toUpperCase() : ''}</option>;
    })}
  </select>
);

Select.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Select;
