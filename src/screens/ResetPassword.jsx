import React, { Component } from 'react'
import { Form, Icon, Input, Button,Tooltip,InputNumber, Checkbox } from 'antd';
import { connect } from 'react-redux'
import {resetpassword} from '../redux/actions/auth';

class ResetPassword extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) { 
        console.log("VALUE =GONE TO RESETPASS STEPS VALUE-->",values);
        this.props.resetpassword(values);    

      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label={
              <span>
                Your E-mail
              </span>
            } hasFeedback>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item  label={
              <span>
                New Password&nbsp;
                <Tooltip title="Password must be minimum 6 character long ">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            } hasFeedback>
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                    min:6,
                    message:"Password should be minimum of 6 character"
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
        <Form.Item  label={
              <span>
                OTP&nbsp;
                <Tooltip title="OTP has been shared to your account">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            } hasFeedback>
          {getFieldDecorator('otp', {
            rules: [{ required: true, message: 'OTP will be 6 digit code sent to your account' },
                {
                    min:6,
                    message:"OTP too short"
                },
                {
                    max:6,
                    message:"OTP too long"
                }
        ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="otp"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const ResetPass=Form.create({name:"reset_form"})(ResetPassword);