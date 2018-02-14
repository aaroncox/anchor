// @flow
import React, { Component } from 'react';
import { Button, Form, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const electron = require('electron');

const { remote } = electron;

type Props = {};

class TrayMenu extends Component<Props> {
  props: Props;

  close = () => {
    electron.remote.app.quit();
  }

  openManager = () => {
    remote.getGlobal('showManager')()
  }

  render() {
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
    return (
      <div>
        <Segment
          attached="top"
          color="blue"
          inverted
          textAlign="center"
        >
          <Header size="small">
            Anchor (v0.0.1)
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
    );
  }
}

export default withRouter(TrayMenu)
