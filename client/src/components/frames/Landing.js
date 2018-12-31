import React, { Component } from 'react';
import { Container, Header, Button, Icon } from 'semantic-ui-react';
import './Landing.less';

// const sectionStyle = {
//   width: "100%",
//   height: "400px"
// };

class Landing extends Component {

  render() {
    return (
      <Container
        textAlign="center">
        <Header
          as="h2"
          content="ro.stradamus"
          inverted
          style={{
            fontSize: "4em",
            fontWeight: "normal",
            verticalAlign: "middle"
          }} />
        <Container
          textAlgin="center"
          style={{
            marginTop: "2rem"
          }} >
          <Button
            color='github'
            as="a"
            href="https://github.com/rostradamus">
            <Icon name='github' /> GitHub
          </Button>
          <Button
            color='instagram'
            as="a"
            href="https://github.com/rostradamus">
            <Icon name='address book' /> Resume
          </Button>
          <Button
            color="linkedin"
            as="a"
            href="https://www.linkedin.com/in/hyung-ro-lee-974b43168/">
            <Icon name="linkedin" /> LinkedIn
          </Button>
        </Container>
      </Container>
    );
  }
}

export default Landing;