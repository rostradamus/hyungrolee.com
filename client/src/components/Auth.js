import React, { Component } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';
import authActions from '../actions/authActions';
import { connect } from 'react-redux';


// TODO: Password Encryption is required (See bcrypt)
class Auth extends Component {
    constructor(props) {
        super(props);
        this.state={
            username: '',
            password: ''
        };
    }

    _handleClick() {
        const {username, password} = this.state;
        this.props.onClickHandler(username, password);
    }

    render() {
        // let onClickHandler = () => this.props.onClickHandler(name, post);
        return (
            <div className='login-form'>
                <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                    height: 100%;
                    }
                `}
                </style>
                <Grid
                    textAlign='center'
                    style={{ height: '100%' }}
                    verticalAlign='middle'
                >
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                            {' '}Log-in to your account
                        </Header>
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input
                                    fluid
                                    icon='user'
                                    iconPosition='left'
                                    placeholder='E-mail address'
                                    onChange = {(event,newValue) => this.setState({username:newValue.value})}
                                />
                                <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    onChange = {(event,newValue) => this.setState({password:newValue.value})}
                                />

                                <Button color='teal' fluid size='large' onClick={event => this._handleClick(event)}>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        {/*<Message>
                            New to us? <a href='#'>Sign Up</a>
                        </Message>*/}
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}
const mapStateToProps = state => ({user: state.auth});

export default connect(mapStateToProps, authActions)(Auth);





