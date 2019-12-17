import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import {signin} from '../redux/actions/auth';
import { CANDIDATE_HOME,CALL_CANDIDATE_BY_ADMIN } from '../constants/Routes';
import Navbar from "../components/Navbar";
import { Link } from 'react-router-dom'


class AdminSignin extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signin(values).then(response=>{
         
          console.log("#######ADMIN LOGIN####",response)
           if(response.role=="2")
            this.props.history.push("/admin");
        
              
            //  this.props.history.push(RECRUITER_HOME);
          //  else
          //  this.props.history.push(ADMIN_HOME);
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
          <h2><span class="adminh2">ADMIN</span> SIGNIN WINDOW</h2>
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
