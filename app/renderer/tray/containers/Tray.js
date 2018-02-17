// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as Settings from '../../../shared/actions/settings';

import TrayMenu from '../components/TrayMenu';

type Props = {};

class TrayContainer extends Component<Props> {
  props: Props;

  render() {
    return (
      <TrayMenu {...this.props} />
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
      ...Settings
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrayContainer));
