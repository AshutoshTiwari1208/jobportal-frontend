import React, { Component } from 'react'
import { Steps, Button, message, notification, Spin } from 'antd';
import  {ForgetPass as ForgetPassword} from './ForgetPassword';
import {forgetpassword} from '../redux/actions/auth';
import { connect } from 'react-redux'
import {ResetPass} from './ResetPassword';
import {resetpassword} from '../redux/actions/auth';
import Navbar from "../components/Navbar";
import {SIGNUP,HOME} from "../constants/Routes";

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
    loading: false,
    email: ''
  }


  next() {
    const current = this.state.current + 1;
    this.setState({ current, loading: false, email:this.state.email });
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
          this.setState({
            email :values.email
          })
          this.next();
      }).catch(err=>{
        // openNotificationWithIcon('error',"Check Email","E-Mail you entered doesn't exists!")
        this.setState({
            loading : false
        })
      })
  }

  handleFinalResetRequest =(values)=>{
      this.props.resetpassword(values).then(response=>{
          message.success('Password Changed Successfully')
          this.props.history.push(HOME);
      }).catch((err)=>{
        console.log(err)
          // openNotificationWithIcon('error', err.data.errors[0].message);
      })
  }

  

  render() {

    const steps = [
      {
        title: 'ForgotPassword',
        content: <ForgetPassword loading={this.state.loading} forgetpassword={this.handleResetRequest}/>,
      },
      {
        title: 'ResetPassword',
        content: <ResetPass current={this.state.current} email={this.state.email} resetpassword={this.handleFinalResetRequest} />,
      },
    ];
    const { current, loading } = this.state;
    return (
        <div>
         <Navbar text="Sign up" to={SIGNUP}/>

      <div className="wrapperForgetPass">
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps> 

        <div className="steps-content">{loading ? <span className="spin"><Spin /></span> : steps[current].content}</div>
        <div className="steps-action" align="right">
          {current < steps.length - 1 && (
          <Button type="default" onClick={() => this.next()}>
            Already Have An OTP?
            </Button>
          )}

          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                Go Back
            </Button>
          )}
        </div>
      </div>
      </div>

    );
  }
}
export const ForgetPassStep=connect(null ,{
    forgetpassword,resetpassword
})(ForgetPassSteps);