// @flow
import React, { Component } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

type Props = {};

class Manager extends Component<Props> {
  props: Props;

  close = () => {
    window.close();
  }

  render() {
    return (
      <div style={{margin: '2px'}}>
        <Segment
          attached="top"
          color="blue"
          inverted
          textAlign="left"
        >
          <Header>
            Settings Manager
          </Header>
        </Segment>
        <Segment attached style={{minHeight: '422px'}}>
          Content
        </Segment>
        <Segment
          attached="bottom"
          textAlign="center"
        >
          <Button onClick={this.close}>
            Dismiss
          </Button>
        </Segment>
      </div>
    );
  }
}

export default withRouter(Manager);
