import React, { Component } from 'react'
import { 
  Form,
    Input,
    Button,
    Icon,
   } from 'antd';
import {postJob} from  "../redux/actions/jobs";

import reqwest from 'reqwest';
import {availablejobs} from "../redux/actions/jobs";
import {connect} from "react-redux";
import store from '../redux/store';//remove---
import JobsList from '../components/JobsView'
const { TextArea } = Input;



class RecruiterHome extends React.Component {
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              this.props.postJob(values).then(response=>{
                  alert("Job is posted Successfully");
                  console.log("$$$JOB POSTED$$$ :: ",response);
              });
            // this.props.signin(values).then(response=>{
             
            //   console.log("###########",response)
    
            //   if(response.role=="0")
            //    this.props.history.push(CANDIDATE_HOME);
            //    if(response.role=="2")
            //     this.props.history.push(CALL_CANDIDATE_BY_ADMIN);
            //   //  else if(response.role=="1")
            //   //  this.props.history.push(RECRUITER_HOME);
            //   //  else
            //   //  this.props.history.push(ADMIN_HOME);
            // })
          }
        });
      };
    
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          <Form onSubmit={this.handleSubmit} className="login-form">
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
              {/* {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(<Checkbox>Remember me</Checkbox>)} */}
              <Button type="primary" htmlType="submit" className="login-form-button">
                Publish Job
              </Button>
            </Form.Item>
          </Form>
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

