import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { connect } from 'react-redux'
import {signin} from '../redux/actions/auth';
import { CANDIDATE_HOME,CALL_CANDIDATE_BY_ADMIN } from '../constants/Routes';


class SigninForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.signin(values).then(response=>{
         
          console.log("###########",response)

          if(response.role=="0")
           this.props.history.push(CANDIDATE_HOME);
           if(response.role=="2")
            this.props.history.push(CALL_CANDIDATE_BY_ADMIN);
            if(response.role=="1")
            this.props.history.push("/recruiter");
              
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
      <Form onSubmit={this.handleSubmit} className="login-form">
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
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
          
          OR <b><a href="">register now!</a></b>
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
 


SigninForm = connect(mapStateToProps, {signin}) (SigninForm);//take then send
export const Signin = Form.create({ name: 'normal_signin' })(SigninForm);

// ReactDOM.render(<Signin />, mountNode);
