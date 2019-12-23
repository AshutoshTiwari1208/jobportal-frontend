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
    redirect:false,
    loading:false
    
  }

  static getDerivedStateFromProps(userData,state){
    return {
      ...state,
      companyName: userData.userData.auth.userdetails.name
    }
  }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
              loading:true
            })
              this.props.postJob(values).then(response=>{
                this.setState({
                  redirect:true,
                  loading:false
                })
              }).catch(err=>{
                this.setState({
                  loading:false
                })
              })
          }
        });
      };
    
      render() {
        document.title = "Recruiter Home";

        if (this.state.redirect) {
          return <Redirect to='/recruiter/jobs'/>;
        }
        const { loading } = this.state;
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
              {getFieldDecorator('companyname', {
                rules: [],
                initialValue: this.state.companyName
              })(
                <Input
                  prefix={<Icon type="copyright" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  disabled="true" value={this.state.companyName} defaultValue={this.state.companyName}
                />,
              )}
            </Form.Item>
            
            
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
                <TextArea rows={9}
                  prefix={<Icon type="edit" style={{ color: 'rgba(0,0,0,.25)' }}
                  rows={4} />}
                  
                  placeholder="Job Description"
                />,
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
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