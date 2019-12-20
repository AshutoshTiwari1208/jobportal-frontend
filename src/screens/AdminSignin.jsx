import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, notification } from 'antd';
import { connect } from 'react-redux'
import {signin} from '../redux/actions/auth';
import { CALL_CANDIDATE_BY_ADMIN } from '../constants/Routes';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'

const openNotificationWithIcon = (type,message,desc) => {
  notification[type]({
      message: message,
      description: desc,
  });
};
class AdminSignin extends React.Component {
  
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signin(values).then(response=>{
         
           if(response.role=="2")
            this.props.history.push("/admin");
        
           else {
            this.props.history.push("/signin");
            openNotificationWithIcon('error',"You are not an admin");

            
           } 
        })
        

      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <Navbar text="Not An Admin?" to="/signin"/>
      <Form onSubmit={this.handleSubmit} className="login-form" className="wrapperForm">
          <h3><span class="adminh2">ADMIN</span> Sign in Window</h3>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
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
          {/* {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)} */}
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          
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
 


 AdminSignin = connect(mapStateToProps, {signin}) (AdminSignin);//take then send
export const SigninAdmin = Form.create({ name: 'normal_signin' })(AdminSignin);

// ReactDOM.render(<Signin />, mountNode);
