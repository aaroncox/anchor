// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import AccountCreate from '../../components/Account/Create';

type Props = {};

class AccountCreateContainer extends Component<Props> {
  props: Props;

  render() {
    return (
      <AccountCreate {...this.props} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AccountCreateContainer));
