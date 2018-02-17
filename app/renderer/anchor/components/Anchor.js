// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

type Props = {
  match: PropTypes.object
};

class Anchor extends Component<Props> {
  props: Props;

  close = () => {
    window.close();
  }

  render() {
    return (
      <I18n ns="anchor">
        {
          (t) => (
            <div style={{ margin: '2px' }}>
              <Segment
                attached="top"
                color="grey"
                inverted
                textAlign="left"
              >
                {t('appname')} - Confirm Operation
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
          )
        }
      </I18n>
    );
  }
}

export default withRouter(Anchor);
