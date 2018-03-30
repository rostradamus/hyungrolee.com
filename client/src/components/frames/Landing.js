import React, { Component } from 'react';
import Background from './images/background.svg';
import './Landing.less';

const sectionStyle = {
  width: "100%",
  height: "400px",
  backgroundImage: `url(${Background})`
};

class Landing extends Component {

  render() {
    return (
      <div className="landing" style={ sectionStyle } />
    )
  }
}

export default Landing;