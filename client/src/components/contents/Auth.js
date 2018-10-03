import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react';
import AuthModal from './AuthModal';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Auth.less';
import { AuthActions, ModalActions } from 'Actions';

// TODO: Password Encryption is required (See bcrypt)
class Auth extends Component {
  constructor(props) {
    super(props);
    this.state={
      email: '',
      password: ''
    };
  }

  async _submitHandler() {
    try {
      const {email, password} = this.state;
      await this.props.login(email, password);
    } catch (e) {
      this.props.openModal(e.message);
    }
  }

  render() {
      return (
          <div className='login-form'>
              <Grid
                  textAlign='center'
                  style={{ height: '100%' }}
                  verticalAlign='middle'>
                  <Grid.Column style={{ maxWidth: 450 }}>
                      <Header as='h2' inverted textAlign='center'>
                          {' '}Log-in to your account
                      </Header>
                      <Form size='large' autoComplete="on" onSubmit={ this._submitHandler.bind(this) }>
                          <Segment stacked>
                              <Form.Input
                                  fluid
                                  icon='user'
                                  iconPosition='left'
                                  placeholder='E-mail address'
                                  autoComplete='username'
                                  onChange = {(event,newValue) => this.setState({email:newValue.value})} />
                              <Form.Input
                                  fluid
                                  icon='lock'
                                  iconPosition='left'
                                  placeholder='Password'
                                  type='password'
                                  autoComplete="current-password"
                                  onChange = {(event,newValue) => this.setState({password:newValue.value})} />
                              <Button
                                fluid
                                content='Login'
                                type='submit'
                                size='large' />
                          </Segment>
                      </Form>
                      {<Message>
                          New to us? <Link to='/register'> Sign Up </Link>
                      </Message>}
                      <AuthModal />
                  </Grid.Column>
              </Grid>
          </div>
      );
  }
}

const mapStateToProps = state => ({user: state.auth});
const mapDispatchToProps = dispatch => ({
  login: async (email, password) => {
    await dispatch(AuthActions.login(email, password));
  },
  openModal: content => {
    dispatch(ModalActions.openModal(content));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);





