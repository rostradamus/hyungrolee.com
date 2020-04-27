import React, { Component } from "react";
// import { Grid } from "semantic-ui-react";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import GoogleMapReact from 'google-map-react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {lat: 37.30, lng: 127.04}, 
      zoom: 12
    };
  }

  render() {
    return (
      <GoogleMapReact 
          bootstrapURLKeys={{
            key: "AIzaSyD_rYHDhVvbHaaYZgqF3aMY-FYyLL5YF9Y", 
            language: "kr",
            region: "kr"
          }}
          defaultCenter={{lat: 37.30, lng: 127.04}}
          center={this.state.center}
          defaultZoom={16}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave} />
    );
  }
}


export default connect()(MapContainer);
