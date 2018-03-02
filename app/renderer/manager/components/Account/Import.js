// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Header, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
  settings: object
};

export default class AccountImport extends Component<Props> {
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
                  {t('title-account-import')}
                </Header>
              </Segment>
              <Segment attached style={{ minHeight: '422px' }}>
                Import Stuff
              </Segment>
              <Segment
                attached="bottom"
                textAlign="center"
              >
                <Button as={Link} to="/">
                  {t('cancel')}
                </Button>
              </Segment>
            </div>
          )
        }
      </I18n>
    );
  }
}
