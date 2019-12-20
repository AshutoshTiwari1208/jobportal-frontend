import React, { Component } from 'react'
import { Form, Icon, Input, Button,Tooltip,message } from 'antd';
import { connect } from 'react-redux'
import {resetpassword} from '../redux/actions/auth';

class ResetPassword extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      
      if (!err) { 
        delete values.confirm;
        if(isNaN(values.otp)){
          message.error('OTP can only be digits');
        }else{
          this.props.resetpassword(values);    
        }
      }
    });
  };
  state={
    email:''
  }


  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };


  render() {
    document.title = "Reset Password";

   
    const { getFieldDecorator } = this.props.form;
    const { email } = this.props;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item label={
              <span>
                Your E-mail
              </span>
            } hasFeedback>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please input your email!' }],
            initialValue :email
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="E-mail"
            />,
          )}
        </Form.Item>
        <Form.Item label="Password" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
              {
                min:6,
                message:"Password should be minimum of 6 character"
            }
            ],
          })(<Input.Password />)}
        </Form.Item>

          <Form.Item label="Confirm Password" hasFeedback>
            {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
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