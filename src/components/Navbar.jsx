import React, { Component } from 'react'
import { Menu, Icon,Typography, Layout } from 'antd';
import { Link } from 'react-router-dom'
import {signout} from "../redux/actions/auth";
import { Redirect } from 'react-router';
import { connect } from 'react-redux'

const { SubMenu } = Menu;

const { Title } = Typography;

class Navbar extends React.Component {
   
  state = {
    current: 'mail',
    redirect:false
  };


  handleClick = (e,to) => {
      if(to=="/signout"){
      e.preventDefault();
      this.props.signout();
      this.setState({
        redirect:true
      })
    }else{
        return;
    }
  };



  render() {
    if (this.state.redirect) {
        return <Redirect to='/signin'/>;
      }
    
    const { text , to, history } = this.props;

  
    // if(to=="signout"){
    //     console.log(to)
    //     signout();
    //     history.push("/signin");
    //     console.log("@#$@#@#2");
    // }



    return (
    //   <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
  
    <Layout
        style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '5px 10px'
        }}
       >

            <Title level={2}key="mail">
            Job portal
            </Title>
            <Title level={4} key="mail">
            <Link onClick={(e) => this.handleClick(e,to)} to={to}>{text}</Link>
            </Title>
       </Layout>
    )
}

}

export default connect(null, { signout })(Navbar);