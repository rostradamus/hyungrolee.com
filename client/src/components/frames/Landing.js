import React, { Component } from 'react';
import './Landing.less';

const sectionStyle = {
  width: "100%",
  height: "400px"
};

class Landing extends Component {

  render() {
    return (
      <div className="landing" style={ sectionStyle } />
    );
  }
}

export default Landing;