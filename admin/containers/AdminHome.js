import React, { PureComponent } from 'react';
import { Form } from 'react-form';
import validate from 'validate.js';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Field from '../../components/Field';
import PageStats from '../../containers/PageStats';

import { getCurrentUser as getCurrentUserAction } from '../../actions/auth';

const constraints = {
  email: { presence: true, email: true },
};

class AdminHome extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(values, e, formApi) {
    const { getCurrentUser } = this.props;

    this.setState({ errors: {} });

    const errors = validate(values, constraints);

    if (errors) {
      return this.setState({ errors });
    }

    getCurrentUser(values.email);

    //return formApi.resetAll();
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props;

    return (
      <section className="admin-wrapper">
        <header className="admin-header">
          <span className="text-label">Admin View</span>
          <Form onSubmit={this.handleSubmit} className="admin-project-search">
            {formApi => (
              <form onSubmit={formApi.submitForm} className="admin-project-search">
                <div className="field is-combo">
                  <Field
                    name="email"
                    type="email"
                    errors={errors}
                    placeholder="Search by user email"
                    className="input"
                    labelIsHidden
                  />
                  <button type="submit" className="button is-tertiary">
                    Search
                  </button>
                </div>
              </form>
            )}
          </Form>
        </header>

        {!!user && (
          <div>
            <div className="container admin-current-account">Currently looking at the account of {user.email}</div>

            <PageStats />
          </div>
        )}
      </section>
    );
  }
}

AdminHome.defaultProps = {
  user: null,
};

AdminHome.propTypes = {
  getCurrentUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    onboarded: PropTypes.bool.isRequired,
  }),
};

export default connect(
  state => ({
    serverErrors: state.project.errorAddContract,
    user: state.auth.user,
  }),
  { getCurrentUser: getCurrentUserAction },
)(AdminHome);
