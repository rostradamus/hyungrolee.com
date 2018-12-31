import React, { Component } from 'react';
import { Container, Header, Item } from 'semantic-ui-react';

class PageNotFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
          <Container
            textAlign="center">
            <Header
              as="h2"
              content="404 page not found"
              inverted />
            <Item>
              We are sorry but the page you are looking for does not exist.
            </Item>
          </Container>
        );
    }
}

export default PageNotFound;
