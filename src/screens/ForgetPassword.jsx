import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { CANDIDATE_HOME,CALL_CANDIDATE_BY_ADMIN } from '../constants/Routes';


class ForgetPassword extends React.Component {
  handleSubmit = e => {
    
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
          this.props.forgetpassword(values);
      }else{
          console.log("ERROR OCCUREDD::::",err);
          const temp="ERROR OCCURED"+err;
          alert(temp);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'E-Mail is needed to Reset password!' }],
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
