import React, { Component } from 'react'
import { Form, Icon, Input, Button,notification } from 'antd';
import { connect } from 'react-redux'
import {signin} from '../redux/actions/auth';
import { CANDIDATE_HOME,CALL_CANDIDATE_BY_ADMIN } from '../constants/Routes';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'
import {SIGNUP,ADMIN_SIGNIN,SIGNIN,RESET_PASSWORD} from "../constants/Routes";

const openNotificationWithIcon = (type,message,desc) => {
  notification[type]({
    message: message,
    description:desc,
  });
};

class SigninForm extends React.Component {

  
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signin(values).then(response=>{
          console.log("###########",response)

          if(response.role=="0")
           this.props.history.push(CANDIDATE_HOME);
           if(response.role=="2"){
            this.props.history.push(SIGNIN);
              openNotificationWithIcon('error',"ADMIN CAN'T GOT THROUGH THIS ROUTE");
           }
            if(response.role=="1")
            this.props.history.push("/recruiter");      
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <Navbar text="Signup" to={SIGNUP}/>
      <div align="left">
             <Link to={ADMIN_SIGNIN}><span  className="links"><u>Admin Signin Window</u></span></Link>
          </div> 
      <Form onSubmit={this.handleSubmit} className="login-form" className="wrapperForm">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
      
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <br/>
          
            Forgot password ? <Link to={RESET_PASSWORD}>Click Here </Link>
         
         <br/>
          OR <b><Link to={SIGNUP}>register now!</Link></b>
        </Form.Item>
      </Form>
      </div>
    );
  }
}

const mapStateToProps = ({auth}) => {
  return ({
    userdetails: auth.userdetails
  })
 }
 
SigninForm = connect(mapStateToProps, {signin}) (SigninForm);
export const Signin = Form.create({ name: 'normal_signin' })(SigninForm);