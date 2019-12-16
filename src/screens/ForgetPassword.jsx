import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import {forgetpassword} from '../redux/actions/auth';
import { CANDIDATE_HOME,CALL_CANDIDATE_BY_ADMIN } from '../constants/Routes';


class ForgetPassword extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
        // console.log("VALUES ARE::::::",values);
      if (!err) {
        this.props.forgetpassword(values).then(response=>{
          console.log("###########",response);  
        })
      }else{
          console.log("ERROR OCCUREDD::::",err);
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


const mapStateToProps = ({auth}) => {
  return ({
    userdetails: auth.userdetails
  })
 }
 

 ForgetPassword = connect(mapStateToProps, {forgetpassword}) (ForgetPassword);//take then send
export const ForgetPass = Form.create({ name: 'normal_signin' })(ForgetPassword);

// ReactDOM.render(<Signin />, mountNode);
