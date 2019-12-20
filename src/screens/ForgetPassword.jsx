import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';


class ForgetPassword extends React.Component {
  handleSubmit = e => {
    
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.forgetpassword(values);
      }else{
          const temp="ERROR OCCURED"+err;
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'E-Mail is needed to Reset password!' },
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
          
          <Button type="primary" htmlType="submit" className="login-form-button">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const ForgetPass = Form.create({ name: 'normal_signin' })(ForgetPassword);
