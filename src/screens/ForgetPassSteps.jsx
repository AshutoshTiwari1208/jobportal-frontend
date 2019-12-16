import React, { Component } from 'react'

import { Steps, Button, message, notification, Spin } from 'antd';
import  {ForgetPass as ForgetPassword} from './ForgetPassword';
import {forgetpassword} from '../redux/actions/auth';
import { connect } from 'react-redux'
import {ResetPass} from './ResetPassword';
import {resetpassword} from '../redux/actions/auth';


const { Step } = Steps;

const openNotificationWithIcon = (type,message,desc) => {
    notification[type]({
      message: message,
      description:desc,
    });
  };

class ForgetPassSteps extends React.Component {
  
  state = {
    current: 0,
    loading: false
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current, loading: false });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current, loading: false });
  }

    handleResetRequest = (values) => {
      this.setState({
          loading: true
      })
      this.props.forgetpassword(values).then(response=>{
          this.next();
      }).catch(err=>{
        openNotificationWithIcon('error',"Check Email","E-Mail you entered doesn't exists!")
        this.setState({
            loading : false
        })
        
        console.log("XXXXX ERRROR IN FORGOT PASS-->",err.response);
      })
  }

  handleFinalResetRequest =(values)=>{
      this.props.resetpassword(values).then(response=>{
          //???check in ant design
          message.success('Password Changed Successfully')
          console.log("SUUCESSFULLY RESET RESPONSE ->",response);
      }).catch(err=>{
            openNotificationWithIcon('error',err.response.data.errors[0].message);
          
      })
  }

  steps = [
    {
      title: 'ForgotPassword',
      content: <ForgetPassword loading={this.state.loa} forgetpassword={this.handleResetRequest}/>,
    },
    {
      title: 'ResetPassword',
      content: <ResetPass resetpassword={this.handleFinalResetRequest} />,
    },
  ];

  render() {
    const { current, loading } = this.state;
    console.log('loading', loading)
    return (
      <div>
        <Steps current={current}>
          {this.steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps> 
        <div className="steps-content">{loading ? <Spin /> : this.steps[current].content}</div>
        <div className="steps-action">
          {/* {current < this.steps.length - 1 && (
            <Button type="primary" onClick={() => this.next()}>
              Next
            </Button>
          )} */}
          {/* {current === this.steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Password Changed Successfully')}>
              Done
            </Button>
          )} */}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>

    );
  }
}
export const ForgetPassStep=connect(null ,{
    forgetpassword,resetpassword
})(ForgetPassSteps);