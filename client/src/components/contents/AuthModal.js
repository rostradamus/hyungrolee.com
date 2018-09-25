import React, { Component } from 'react';
import { Button, Modal, Icon } from "semantic-ui-react";
import { connect } from "react-redux";
import authActions from "Actions/authActions";

class AuthModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { modalProps, close } = this.props;

    return (
      <Modal
        size="mini"
        open={ modalProps.isModalOpen }
        onClose={ close }
        basic>
        <Modal.Content
          as="p"
          content={ modalProps.content }/>
        <Modal.Actions>
          <Button color='green' onClick={ close } inverted>
            <Icon name='checkmark' /> Got it
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  authState: state.auth
});

export default connect(mapStateToProps, authActions)(AuthModal);