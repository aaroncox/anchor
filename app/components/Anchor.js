// @flow
import React, { Component } from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

type Props = {};

class Anchor extends Component<Props> {
  props: Props;

  close = () => {
    window.close();
  }

  render() {
    return (
      <div style={{ margin: '2px' }}>
        <Segment
          attached="top"
          color="grey"
          inverted
          textAlign="left"
        >
          Anchor - Confirm Operation
        </Segment>
        <Segment attached>
          {this.props.match.params.ops}
        </Segment>
        <Segment attached>
          {this.props.match.params.meta}
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

export default withRouter(Anchor);
