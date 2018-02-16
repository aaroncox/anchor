// @flow

import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import packageJson from '../package.json';

const electron = require('electron');

const { remote } = electron;

type Props = {};

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

class TrayMenu extends Component<Props> {
  props: Props;

  close = () => {
    electron.remote.app.quit();
  }

  openManager = () => {
    const showManager = remote.getGlobal('showManager');
    showManager();
  }

  render() {
    const { version } = packageJson;
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
                <Form>
                  <Form.Select
                    fluid
                    label="Default Account"
                    options={accounts}
                    placeholder="@jesta"
                  />
                </Form>
              </Segment>
              <Segment attached>
                <Button onClick={this.openManager}>
                  Test Manager
                </Button>
                <Button onClick={this.openAnchor}>
                  Test Anchor
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

export default withRouter(TrayMenu);
