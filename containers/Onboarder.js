import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setOnboardingFlag as setOnboardingFlagAction } from '../actions/auth';
import { toggleModal as toggleModalAction, setOnboardingStep as setOnboardingStepAction } from '../actions/ui';
import TourTooltip from '../components/TourTooltip';
import TourCard from '../components/TourCard';
import { ONBOARDING_STEPS } from '../constants';

class Onboarder extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { askCancel: false };

    this.completeOnboarding = this.completeOnboarding.bind(this);
    this.toggleAskCancel = this.toggleAskCancel.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (Object.keys(this.props.projects).length !== Object.keys(prevProps.projects).length) {
      this.props.history.push(`/project/${Object.keys(this.props.projects)[0]}`);
      setTimeout(() => this.props.setOnboardingStep(this.props.currentOnboardingStep + 1), 10);
    }
  }

  completeOnboarding() {
    const { userid, setOnboardingFlag } = this.props;

    setOnboardingFlag(userid);
  }

  toggleAskCancel() {
    this.setState({
      askCancel: !this.state.askCancel,
    });
  }

  render() {
    const {
      modalOpen,
      currentOnboardingStep,
      currentOnboardingCoordinates,
      toggleModal,
      setOnboardingStep,
      projects,
    } = this.props;
    const step = ONBOARDING_STEPS[currentOnboardingStep];
    const stepCount = ONBOARDING_STEPS.length;
    const isFirstCard = currentOnboardingStep < 0;
    const isLastCard = currentOnboardingStep === stepCount;

    if (isFirstCard || isLastCard) {
      return (
        <TourCard
          startOnboarding={() => setOnboardingStep(currentOnboardingStep + 1)}
          completeOnboarding={this.completeOnboarding}
          toggleAskCancel={this.toggleAskCancel}
          askCancel={this.state.askCancel}
          finalCard={isLastCard}
        />
      );
    }

    const nextFunc =
      currentOnboardingStep === 0 && Object.keys(projects).length === 0
        ? toggleModal
        : () => setOnboardingStep(currentOnboardingStep + 1);

    const { left, right, top } = currentOnboardingCoordinates;

    let sideStyle = {
      // if step.side === 'left'
      left,
      top,
    };

    // if (step.side === 'right') {
    //   sideStyle = {
    //     left: right,
    //     top,
    //   };
    // }

    if (step.side === 'top') {
      sideStyle = {
        left: left + (right - left) / 2,
        top: top - 20,
      };
    }

    return (
      <React.Fragment>
        {currentOnboardingCoordinates.top >= 0 && !modalOpen && (
          <div className="onboarder" style={sideStyle}>
            <TourTooltip
              side={step.side}
              titleCopy={step.titleCopy}
              bodyCopy={step.bodyCopy}
              nextFunc={nextFunc}
              prevFunc={setOnboardingStep}
              completeOnboarding={this.completeOnboarding}
              stepAmount={stepCount}
              currentStepCount={currentOnboardingStep}
              buttonCopy={step.buttonCopy}
              toggleAskCancel={this.toggleAskCancel}
              askCancel={this.state.askCancel}
            />
          </div>
        )}
      </React.Fragment>
    );
  }
}

Onboarder.propTypes = {
  userid: PropTypes.string.isRequired,
  setOnboardingFlag: PropTypes.func.isRequired,
  setOnboardingStep: PropTypes.func.isRequired,
  toggleModal: PropTypes.func.isRequired,
  modalOpen: PropTypes.string.isRequired,
  projects: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentOnboardingStep: PropTypes.number.isRequired,
  currentOnboardingCoordinates: PropTypes.shape({
    top: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(
  connect(
    state => ({
      userid: state.auth.user ? state.auth.user.id : '',
      modalOpen: state.ui.showModal,
      projects: state.project.list,
      currentOnboardingStep: state.ui.currentOnboardingStep,
      currentOnboardingCoordinates: state.ui.currentOnboardingCoordinates,
    }),
    {
      setOnboardingFlag: setOnboardingFlagAction,
      setOnboardingStep: setOnboardingStepAction,
      toggleModal: () => toggleModalAction('ADD_PROJECT'),
    },
  )(Onboarder),
);
