// @flow

import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Dropdown, Header, Segment } from 'semantic-ui-react';
import packageJson from '../../../package.json';

const electron = require('electron');

const { remote } = electron;

type Props = {
  actions: {
    setPreference: () => void
  }
};

const accounts = [
  {
    key: 'jesta',
    text: '@jesta',
    value: 'jesta',
    active: true
  },
  {
    key: 'aaron',
    text: '@aaron',
    value: 'aaron'
  }
];

export default class TrayMenu extends Component<Props> {
  props: {
    settings: {}
  };

  close = () => {
    electron.remote.app.quit();
  }

  openManager = () => {
    const showManager = remote.getGlobal('showManager');
    showManager();
  }

  handleAccountChange = (e, { value }) => {
    const { setPreference } = this.props.actions;
    setPreference('defaultAccount', value);
  }

  render() {
    const { version } = packageJson;
    const { settings } = this.props;
    const { defaultAccount } = settings;
    return (
      <I18n ns="tray">
        {
          (t) => (
            <div>
              <Segment
                attached="top"
                color="blue"
                inverted
                textAlign="center"
              >
                <Header size="small">
                  {t('appname')} (v{version})
                </Header>
              </Segment>
              <Segment attached>
                <Dropdown
                  defaultValue={defaultAccount}
                  fluid
                  search
                  selection
                  options={accounts}
                  onChange={this.handleAccountChange}
                />
              </Segment>
              <Segment attached>
                <Button onClick={this.openManager}>
                  Test Manager
                </Button>
              </Segment>
              <Segment
                attached="bottom"
                textAlign="center"
              >
                <Button onClick={this.close}>
                  Exit Program
                </Button>
              </Segment>
            </div>
          )
        }
      </I18n>
    );
  }
}
