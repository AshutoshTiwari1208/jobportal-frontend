import React, { Component } from 'react'
import {
notification} from 'antd';
import { connect } from 'react-redux';
import {HOME} from "../constants/Routes";
import {signout} from "../redux/actions/auth";


export function AuthenticationControl (Component){

const openNotificationWithIcon = (type,message,desc) => {
    notification[type]({
        message: message,
        description:desc,
    });
    };
    
    

    class authControl extends React.Component{

        componentDidMount() {
            this.handleAuth();
        }
        state={
            isAuthenticated:true
        }

        handleAuth = () => {
                const {history}=this.props;
                const {role}=this.props.userData.auth.userdetails;
                // if((this.props.location.pathname.startsWith("/candidate/jobs/applications"))&&(role=="1")){
                //         history.push("/signin");
                //         openNotificationWithIcon('error',"Not authorized to Access this route");
                //         this.state.isAuthenticated=false;
                // }
                if(this.props.location.pathname.startsWith("/admin")&&(role != "2")){
                    this.props.signout();
                    history.push("/signin");
                    openNotificationWithIcon('error',"Not authorized to Access this route");
                    this.state.isAuthenticated=false;
                }
                else if(this.props.location.pathname.startsWith("/candidate")&& role!="0"){
                    this.props.signout();
                    history.push(HOME);
                    openNotificationWithIcon('error',"Not authorized to Access this route");

                    this.state.isAuthenticated=false;
                }
                else if(this.props.location.pathname.startsWith("/recruiter")&& role!="1"){
                   this.props.signout(); 
                    history.push("/signin");
                    openNotificationWithIcon('error',"Not authorized to Access this route");
                    this.state.isAuthenticated=false;
                }
            }



        render(){
           return(
           <div>
            { 
            this.state.isAuthenticated==true ?
                <Component {...this.props}/> //which props?
                : null  //render nothing
            }

            </div>
           )
        }

    }
    const mapStateToProps=(store)=>{
        return({
            userData:store
        })
    }
    
    return connect(mapStateToProps,{signout})(authControl);
}


