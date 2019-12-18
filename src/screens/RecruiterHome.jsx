import React, { Component } from 'react'
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'
import {SIGNOUT} from "../constants/Routes";
import { 
  Form,
    Input,
    Button,
    Icon,
   } from 'antd';
import {postJob} from  "../redux/actions/jobs";
import {connect} from "react-redux";
import { Redirect } from 'react-router';

const { TextArea } = Input;

class RecruiterHome extends React.Component {
  state={
    redirect:false
  }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              this.props.postJob(values).then(response=>{
                this.setState({
                  redirect:true
                })
              });
          }
        });
      };
    
      render() {
        if (this.state.redirect) {
          return <Redirect to='/recruiter/jobs'/>;
        }
        const { getFieldDecorator } = this.props.form;
        return (
          <div>
          <div>
          <Navbar text="Logout" to={SIGNOUT}/>
          </div>
          <div align="left">
            <Link to="/recruiter/jobs"><span  className="links"><u>View Your Published Jobs!</u></span></Link>
          </div> 
          <div className="wrapperForm">
          <Form  onSubmit={this.handleSubmit} className="login-form">
            <h2><strong>Publish New Job</strong></h2>
            <Form.Item>
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Please mention title of Job!' }],
              })(
                <Input
                  prefix={<Icon type="tag" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Job Title"
                />,
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Please mention description of job!' }],
              })(
                <TextArea rows={4}
                  prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }}
                  rows={4} />}
                  
                  placeholder="Job Description"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Publish Job
              </Button>
            </Form.Item>
          </Form>
          </div>
          </div>
        );
      }
}

const mapStateToProps=state=>{
  return{
    userData:state
  }
}


RecruiterHome=connect(mapStateToProps,{postJob})(RecruiterHome);

export const RecruiterPostJobs = Form.create({ name: 'candidateJobs' })(RecruiterHome);

