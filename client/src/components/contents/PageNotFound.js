import React, { Component } from 'react';

class PageNotFound extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
              <h3>404 page not found</h3>
              <p>We are sorry but the page you are looking for does not exist.</p>
            </div>
        );
    }
}

export default PageNotFound;
