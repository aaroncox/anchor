// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Welcome from '../components/Welcome';
import * as Wallet from '../../../shared/actions/wallet';
import * as Settings from '../../../shared/actions/settings';

type Props = {};

class WelcomeContainer extends Component<Props> {
  props: Props;

  render() {
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
      ...Settings,
      ...Wallet
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer));
