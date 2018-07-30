import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import authActions from 'Actions/authActions';
import { connect } from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state={
            firstName: "",
            lastName: "",
            nickName: "",
            email: "",
            password: "",
            cPassword: ""
        };
    }

    _submitHandler() {
      if (this._validateForm()) {
        this.props.onRegisterSubmit(this.state);  
      }
    }

    _validateForm() {
      // TODO
      return true;
    }

    render() {
        return (
            <div className='register-form'>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' inverted textAlign='center'>
                            {' '}Register your account
                        </Header>
                        <Form size='large' autoComplete="on" onSubmit={ this._submitHandler.bind(this) }>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    iconPosition='left'
                                    placeholder='First Name'
                                    autoComplete='given-name'
                                    onChange = {(event,newValue) => this.setState({firstName:newValue.value})} />
                                <Form.Input
                                    fluid
                                    iconPosition='left'
                                    placeholder='Last Name'
                                    autoComplete='family-name'
                                    onChange = {(event,newValue) => this.setState({lastName:newValue.value})} />
                                <Form.Input
                                    fluid
                                    iconPosition='left'
                                    placeholder='Nickname'
                                    autoComplete='nickname'
                                    onChange = {(event,newValue) => this.setState({nickName:newValue.value})} />
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    autoComplete='email'
                                    onChange = {(event,newValue) => this.setState({email:newValue.value})} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    autoComplete="new-password"
                                    onChange = {(event,newValue) => this.setState({password:newValue.value})} />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Confirm Password'
                                    type='password'
                                    autoComplete="confirm-password"
                                    onChange = {(event,newValue) => this.setState({cPassword:newValue.value})} />
                                <Button
                                  fluid
                                  content='Register'
                                  type='submit'
                                  size='large' />
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}

const mapStateToProps = state => {
  console.log(state);
};

export default connect(mapStateToProps, authActions)(Register);
