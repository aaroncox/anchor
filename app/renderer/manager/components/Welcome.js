// @flow
import React, { Component } from 'react';
import { I18n } from 'react-i18next';
import { Button, Form, Header, Input, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

type Props = {
  actions: {
    setPreference: () => void,
    setKey: () => void
  },
  wallet: {}
};


export default class Welcome extends Component<Props> {
  props: Props;

  constructor() {
    super();

    this.state = {
      account: 'account_name',
      key: '5JCDRqLdyX4W7tscyzyxav8EaqABSVAWLvfi7rdqMKJneqqwQGt',
      password: 'password',
      type: 'posting'
    };
  }

  close = () => {
    window.close();
  }

  onInputChange = (e, { name, value }) => this.setState({ [name]: value });

  onSubmit = () => {
    const {
      account,
      key,
      password,
      type
    } = this.state;
    const { setKey } = this.props.actions;
    setKey(password, account, type, key);
  }

  render() {
    const {
      account,
      key,
      password,
      type
    } = this.state;
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
                <hr/>
                <Header>Test Key Saving Form:</Header>
                <Form onSubmit={this.onSubmit}>
                  <p>
                    Account: <Input name="account" onChange={this.onInputChange} value={account} />
                  </p>
                  <p>
                    WIF Key: <Input name="key" onChange={this.onInputChange} value={key} />
                  </p>
                  <p>
                    Key Type: <Input name="type" onChange={this.onInputChange} value={type} />
                  </p>
                  <p>
                    Password: <Input name="password" onChange={this.onInputChange} value={password} />
                  </p>
                  <Button>
                    Add
                  </Button>
                  {(this.props.wallet.lastMessage)
                    ? t(this.props.wallet.lastMessage.key, this.props.wallet.lastMessage.data)
                    : ''
                  }
                </Form>
              </Segment>
            </div>
          )
        }
      </I18n>
    );
  }
}
