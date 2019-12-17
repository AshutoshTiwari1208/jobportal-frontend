import React, { Component } from 'react'
import {
    Form,
    Input,
    Tooltip,
    Button,
    AutoComplete,
    Icon,
    Radio,
  } from 'antd';
  import Navbar from "../components/Navbar";
  import { signup } from "./../redux/actions/auth"
  import { connect } from 'react-redux'
  import { CANDIDATE_HOME,RECRUITER_HOME,SIGNIN } from './../constants/Routes';

  const AutoCompleteOption = AutoComplete.Option;
  
  class SignupForm extends React.Component {

    state = {
      confirmDirty: false,
      autoCompleteResult: [],
    };
  
    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        console.log(values);
        if (!err) {
          // console.log('Received values of form: ', values);
          this.props.signup(values).then((data)=>{
              if(data.role=="0"){
                  this.props.history.push(CANDIDATE_HOME);
              }
              else if(data.role=="1"){
                this.props.history.push(RECRUITER_HOME);
              }
        
          })
        }
      });
    };
  
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
  
    handleWebsiteChange = value => {
      let autoCompleteResult;
      if (!value) {
        autoCompleteResult = [];
      } else {
        autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
      }
      this.setState({ autoCompleteResult });
    };
  
    render() {
      const { getFieldDecorator } = this.props.form;
      const { autoCompleteResult } = this.state;
  
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
   
      const websiteOptions = autoCompleteResult.map(website => (
        <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
      ));
  
      return (
        <div >
          
        <Navbar text="Signin" to="/signin"/>

        <Form {...formItemLayout} onSubmit={this.handleSubmit} className="wrapperForm">
          <Form.Item label="E-Mail">
            {getFieldDecorator('username', { //check
              rules: [
                {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
                },
                {
                  required: true,
                  message: 'Please input your E-mail!',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item  label={
              <span>
                Password&nbsp;
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
      
          <Form.Item
            label={
              <span>
                Name&nbsp;
                <Tooltip title="Please write full name seperated with space - eg. Aman Kumar">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            }
          >
            {getFieldDecorator('name', {
              rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
            })(<Input />)}
          </Form.Item>

          <Form.Item label="Your Profile">
            {getFieldDecorator('role',{
                rules:[{required: true,message: "Please select your role!"}]
            })(
                <Radio.Group>
                <Radio.Button value="0">I am a Candidate</Radio.Button>
                <Radio.Button value="1">I am a Recruiter</Radio.Button>
                </Radio.Group>,
            )}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Signup 
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
   


SignupForm = connect(mapStateToProps, {signup})(SignupForm);



export const Signup = Form.create({ name: 'normal_signup' })(SignupForm);

  