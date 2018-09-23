import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Grid, Header, Segment, Modal, Icon } from "semantic-ui-react";
import authActions from "Actions/authActions";
import { connect } from "react-redux";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state={
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      cPassword: "",
      modalState: {
        isModalOpen: false,
        content: ""
      }
    };
  }

  async _submitHandler() {
    try {
      this._validateForm();
      await this.props.onRegisterSubmit(this.state);
    } catch(e) {
      this.setState({modalState: {isModalOpen: true, content: e.message}});
    }
  }

  _validateForm() {
    // TODO: Use different UI for error message;
    const { firstName, lastName, email, password, cPassword} = this.state;
    if (firstName.trim() === "") throw new Error("Please enter first name");
    if (lastName.trim() === "") throw new Error("Please enter last name");
    if (!this._validateEmail(email)) throw new Error("Please enter valid email address");
    if (!this._validatePassword(password)) 
      throw new Error("Please enter valid password \n"
        + "Passwords must be: \n"
        + "* - At least 8 characters long, max length anything \n"
        + "* - Include at least 1 lowercase letter \n"
        + "* - 1 capital letter\n"
        + "* - 1 number\n"
        + "* - 1 special character => !@#$%^&*");
    if (password !== cPassword) throw new Error("Password does not match the confirm password");
  }

  _validateEmail(email) {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(String(email).toLowerCase());
  }

  _validatePassword(password) {
    const regex = /^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
    return regex.test(password);
  }

  _closeModal() {
    this.setState({modalState: {isModalOpen: false}});
  }

  render() {
    const { modalState } = this.state;
    return (
      <div className="register-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle">
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" inverted textAlign="center">
              {" "}Register your account
            </Header>
            <Form size="large" autoComplete="on" onSubmit={ this._submitHandler.bind(this) }>
              <Segment stacked>
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="First Name"
                  autoComplete="given-name"
                  onChange = {(event,newValue) => this.setState({firstName:newValue.value})} />
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="Last Name"
                  autoComplete="family-name"
                  onChange = {(event,newValue) => this.setState({lastName:newValue.value})} />
                <Form.Input
                  fluid
                  iconPosition="left"
                  placeholder="Nickname"
                  autoComplete="nickname"
                  onChange = {(event,newValue) => this.setState({userName:newValue.value})} />
                <Form.Input
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="E-mail address"
                  autoComplete="email"
                  onChange = {(event,newValue) => this.setState({email:newValue.value})} />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  autoComplete="new-password"
                  onChange = {(event,newValue) => this.setState({password:newValue.value})} />
                <Form.Input
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Confirm Password"
                  type="password"
                  autoComplete="confirm-password"
                  onChange = {(event,newValue) => this.setState({cPassword:newValue.value})} />
                <Button
                  fluid
                  content="Register"
                  type="submit"
                  size="large" />
                <Modal
                  size="mini"
                  open={ modalState.isModalOpen }
                  onClose={ this._closeModal.bind(this) }
                  basic>
                  <Modal.Content
                    as="p"
                    content={ modalState.content }/>
                  <Modal.Actions>
                    <Button color='green' onClick={ this._closeModal.bind(this) } inverted>
                      <Icon name='checkmark' /> Got it
                    </Button>
                  </Modal.Actions>
                </Modal>
              </Segment>
            </Form>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

Register.propTypes = {
  onRegisterSubmit: PropTypes.func
};

const mapStateToProps = state => (state);

export default connect(mapStateToProps, authActions)(Register);
