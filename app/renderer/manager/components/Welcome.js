// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
  settings: object
};

export default class Welcome extends Component<Props> {
  props: Props;

  close = () => {
    window.close();
  }

  render() {
    console.log(this.props)
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
                  {t('title-welcome')}
                </Header>
              </Segment>
              <Segment attached style={{ minHeight: '487px' }}>
                <p>
                  <ul>
                    <li><Link to="/account/create">/account/create</Link></li>
                    <li><Link to="/account/import">/account/import</Link></li>
                  </ul>
                </p>
                <p>WELCOME!</p>
                <p>File save location: </p>
              </Segment>
            </div>
          )
        }
      </I18n>
    );
  }
}
