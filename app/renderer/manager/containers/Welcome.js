// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Welcome from '../components/Welcome';

type Props = {};

class WelcomeContainer extends Component<Props> {
  props: Props;

  render() {
    console.log(this.props)
    return (
      <Welcome {...this.props} />
    );
  }
}

function mapStateToProps(state) {
  return {
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer));
