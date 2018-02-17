// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Manager from '../components/Manager';

type Props = {};

class ManagerContainer extends Component<Props> {
  props: Props;

  render() {
    return (
      <Manager {...this.props} />
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log(state)
  return {
    settings: state.settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
    }, dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagerContainer));
