import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toggleModal as toggleModalAction } from '../actions/ui';
import getDateString from './stats/getDateString';

const Project = ({ name, id, created }) => (
  <section className="card has-no-padding project-card">
    <section className="card-main is-flex-tablet">
      <section className="project-main">
        <div className="project-header">
          <FontAwesomeIcon icon={['fas', 'check-circle']} size="lg" className="project-status" />
          <h2 className="card-title">{name}</h2>
        </div>
        <span className="project-meta">Created on {getDateString(Number(created) * 1000, 'YEAR')}</span>
      </section>
      <aside className="project-aside">
        <Link to={`project/${id}`} className="button is-ghost-tertiary has-icon">
          <FontAwesomeIcon icon={['fal', 'pencil']} />
          View Project
        </Link>
        <Link to={`stats/${id}`} className="button is-ghost-tertiary has-icon">
          <FontAwesomeIcon icon={['fal', 'chart-line']} />
          View Stats
        </Link>
      </aside>
    </section>
  </section>
);

Project.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
};

export default connect(
  () => ({}),
  {
    toggleModal: toggleModalAction,
  },
)(Project);
