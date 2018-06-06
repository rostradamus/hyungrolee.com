import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';
import './Header.less';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'blog'
    };
  }

  _handleClickSlideBar() {
    this.props.toggleHandler();
  }
  

  _handleItemClick(e, { name }) {
    this.setState({ activeItem: name });
  }

  _getAuthStatus() {
    return this.props.auth && this.props.auth._id;
  }

  _createItemRight({path, name}) {
    const { activeItem } = this.state;
    const result = 
      <Menu.Item 
        position='right'
        className='menu_right_item'
        as={ Link } 
        to={ path }
        key={ name }
        name={ name }
        active={activeItem === name} 
        onClick={this._handleItemClick.bind(this)} />;
      
    return result;
  }

  renderContent() {
    switch (this._getAuthStatus()) {
      case undefined:
      case null:
      case false:
        return <Menu.Item className='menu_right_item' position='right' key='login' name='login' href='/login' />;
      default:
        return <Menu.Item className='menu_right_item' position='right' key='logout' name='logout' href='/api/user/logout' />;
    }
  }

  renderUserNavigation() {
    const menuItems = [
      {
        path: '/post/list',
        name: 'blog'
      },
      {
        path: '/portfolio',
        name: 'portfolio'
      },
      {
        path: '/sns',
        name: 'SNS'
      }
    ];
    return menuItems.map(data => this._createItemRight(data));
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Segment inverted className='frame_header'>
        <Menu inverted pointing secondary>
          <Menu.Item 
            header
            position='left'
            content="ro.Stradamus"
            onClick={ this._handleClickSlideBar.bind(this) } />
          <Menu.Item 
            position='right'
            as={ Link }
            to='/about'
            key='about'
            name='about'
            active={activeItem === 'about'}
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
