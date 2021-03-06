// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
  settings: object
};

export default class Manager extends Component<Props> {
  props: Props;

  close = () => {
    window.close();
  }

  render() {
    return (
      <I18n ns="manager">
        {
          (t) => (
            <div style={{ margin: '2px' }}>
              <Segment
                attached="top"
                color="blue"
                inverted
                textAlign="left"
                style={{ '-webkit-app-region': 'drag' }}
              >
                <Header>
                  {t('title')}
                </Header>
              </Segment>
              <Segment attached style={{ minHeight: '422px' }}>
                <p>
                  <ul>
                    <li><Link to="/account/create">/account/create</Link></li>
                    <li><Link to="/account/import">/account/import</Link></li>
                    <li><Link to="/welcome">/welcome</Link></li>
                  </ul>
                </p>
                {JSON.stringify(this.props.settings)}
              </Segment>
              <Segment
                attached="bottom"
                textAlign="center"
              >
                <Button onClick={this.close}>
                  {t('dismiss')}
                </Button>
              </Segment>
            </div>
          )
        }
      </I18n>
    );
  }
}
