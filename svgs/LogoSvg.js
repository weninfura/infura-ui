/* eslint max-len: 0 */
import React from 'react';

const Logo = ({ width = '29', height = '24', fill = '#000000', viewBox = '0 0 29 24' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} xmlSpace="preserve" viewBox={viewBox}>
    <polygon
      fill={fill}
      fillRule="evenodd"
      points=".825 0 .825 3.651 9.549 2.754 12.769 2.754 12.769 8.665 7.347 10.323 0 12.095 1.091 15.666 8.131 12.961 12.769 11.543 12.769 21.247 9.549 21.247 .825 20.348 .825 24 27.468 24 27.468 20.348 18.744 21.247 15.523 21.247 15.523 11.543 20.138 12.953 27.203 15.666 28.293 12.095 20.965 10.328 15.523 8.665 15.523 2.754 18.744 2.754 27.468 3.651 27.468 0"
    />
  </svg>
);

export default Logo;
