import React, { Component } from 'react'
import { Form, Icon, Input, Button,notification } from 'antd';
import { connect } from 'react-redux'
import {signin} from '../redux/actions/auth';
import { AVAILABLE_JOBS,CALL_CANDIDATE_BY_ADMIN,RECRUITER } from '../constants/Routes';
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

          if(response.role=="0")
           this.props.history.push(AVAILABLE_JOBS);
           if(response.role=="2"){
            this.props.history.push(SIGNIN);
              openNotificationWithIcon('error',"ADMIN CAN'T GOT THROUGH THIS ROUTE");
           }
            if(response.role=="1")
            this.props.history.push(RECRUITER);      
        })
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <Navbar text="Sign up" to={SIGNUP}/>
      
          <h3 align="center"><span  className="h2WrapperSignup">Sign in to Existing Account</span></h3>

      <Form onSubmit={this.handleSubmit} className="login-form" className="wrapperForm">

        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' },
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
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
        <div align="center">
             <Link to={ADMIN_SIGNIN}><span  className="links"><u>Click for Admin Sign in Window</u></span></Link>
          </div> 
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