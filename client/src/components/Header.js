import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  _handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  _getAuthStatus() {
    return this.props.auth && this.props.auth._id;
  }

  renderContent() {
    const { activeItem } = this.state;
    switch (this._getAuthStatus()) {
      case undefined:
      case null:
      case false:
        return <Menu.Item key='login' name='login' position='right' href='/login' />;
      default:
        return <Menu.Item name='logout' position='right' href='/api/users/logout' />;
    }
  }

  renderUserNavigation() {
    if(this._getAuthStatus()) {
      const { activeItem } = this.state;
      const menuItems = [
        <Menu.Item as={ Link } to='/post/list' key='blog' name='blog' active={activeItem === 'blog'} onClick={this._handleItemClick.bind(this)} />,
        <Menu.Item key='jobs' name='jobs' active={activeItem === 'jobs'} onClick={this._handleItemClick.bind(this)} />,
        <Menu.Item key='locations' name='locations' active={activeItem === 'locations'} onClick={this._handleItemClick.bind(this)} />
      ];
      return menuItems;
    }
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted>
        <Menu inverted pointing secondary>
          <Menu.Item header>ro.Stradamus</Menu.Item>
          <Menu.Item 
            as={ Link }
            to={'/'}
            key='home'
            name='home'
            active={activeItem === 'home'}
            onClick={ this._handleItemClick.bind(this)} />
          { this.renderUserNavigation() }
          { this.renderContent() }
        </Menu>
      </Segment>
      );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Header);
