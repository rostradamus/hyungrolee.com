import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    

    handleItemClick(e, { name }) {
        this.setState({ activeItem: name });
    }

    getAuthStatus() {
        return this.props.auth && this.props.auth._id;
    }

    renderContent() {
        const { activeItem } = this.state;
        switch (this.getAuthStatus()) {
        case undefined:
        case null:
        case false:
            return <Menu.Item key='login' name='login' position='right' active={activeItem === 'login'} href='/login' />;
        default:
            return <Menu.Item name='logout' position='right' active={activeItem === 'logout'} href='/users/logout' />;
        }
    }

    renderUserNavigation() {
        if(this.getAuthStatus()) {
            const { activeItem } = this.state;
            const menuItems = [
                <Link to='/post/list' key='post_list'>
                    <Menu.Item key='blog' name='blog' active={activeItem === 'blog'} onClick={this.handleItemClick.bind(this)} />
                </Link>,
                <Menu.Item key='jobs' name='jobs' active={activeItem === 'jobs'} onClick={this.handleItemClick.bind(this)} />,
                <Menu.Item key='locations' name='locations' active={activeItem === 'locations'} onClick={this.handleItemClick.bind(this)} />
            ];
            return menuItems;
        }
    }

    render() {
        const { activeItem } = this.state;

        return (
            <Menu inverted>
                <Menu.Item header>ro.Stradamus</Menu.Item>
                <Menu.Item key='home' name='home' active={activeItem === 'home'} onClick={ this.handleItemClick.bind(this) } href='/' />
                { this.renderUserNavigation() }
                { this.renderContent() }
            </Menu>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Header);
