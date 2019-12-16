import React, { Component } from 'react'
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom'

const { SubMenu } = Menu;

class Navbar extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {

    const { text , to } = this.props;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
        <Menu.Item key="mail">
          <Icon type="mail" />
          Job portal
        </Menu.Item>
        <Menu.Item key="mail">
          <Icon type="mail" />
          <Link to={to}>{text}</Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default Navbar;