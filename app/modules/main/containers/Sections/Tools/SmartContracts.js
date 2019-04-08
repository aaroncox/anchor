// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { mapValues } from 'lodash';

import ToolsSmartContractComponent from '../../../../../shared/components/Contract/Interface/Component';

import * as ContractActions from '../../../../../shared/actions/contracts';
import * as TableActions from '../../../../../shared/actions/table';
import * as NavigationActions from '../../../actions/navigation';

import EOSContract from '../../../../../shared/utils/EOS/Contract';

class ToolsPermissions extends Component<Props> {
  componentDidMount() {
    const { actions } = this.props;

    actions.moduleLoaded();
  }

  render = () => (
    <ToolsSmartContractComponent
      {...this.props}
    />
  )
}

function mapStateToProps(state) {
  // Wrap all contracts in the associated helper
  const contracts = mapValues(state.contracts, (contract) =>
    new EOSContract(contract.abi, contract.account_name));
  return {
    blockExplorers: state.blockexplorers[state.connection.chainKey],
    contracts,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    transaction: state.transaction
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ContractActions,
      ...NavigationActions,
      ...TableActions
    }, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ToolsPermissions));
