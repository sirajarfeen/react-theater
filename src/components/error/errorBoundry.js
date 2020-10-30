import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Sentry from '@sentry/browser';
import ErrorPage from './errorPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, eventid: null };
    this.clearState = this.clearState.bind(this);
  }

  // eventId: null
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // if (process.env.NODE_ENV === 'production') {
    Sentry.withScope((scope) => {
      scope.setTag('Custom-Tag', 'ErrorBoundary');
      scope.setLevel('Error');
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
    // }
  }

  clearState() {
    this.setState({ error: null, errorInfo: null, eventId: null });
  }

  render() {
    if (this.state.error) {
      return <ErrorPage clearState={this.clearState} />;
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.any
};

export default ErrorBoundary;
