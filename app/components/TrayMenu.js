// @flow
import React, { Component } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

const electron = require('electron');

const { remote } = electron;

type Props = {};

class TrayMenu extends Component<Props> {
  props: Props;

  close = () => {
    window.close();
  }

  openManager = () => {
    console.log(remote.getGlobal('showManager'))
    remote.getGlobal('showManager')()
  }

  render() {
    console.log(this.props)
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
          <Button onClick={this.openManager}>
            Management
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
