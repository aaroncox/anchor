// @flow
import React, { Component } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {};

export default class extends Component<Props> {
  props: Props;

  close = () => {
    window.close();
  }

  render() {
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
          menu stuff
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
