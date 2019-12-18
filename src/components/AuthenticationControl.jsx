import React, { Component } from 'react'
import { Card,
Button,
Icon,
Pagination,
notification} from 'antd';
import { connect } from 'react-redux';
import {appliedjobslist} from "../redux/actions/jobs";

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
                if(this.props.location.pathname.startsWith("/admin")&&(role != "2")){
                    console.log("ROle",this.props.location.pathname.startsWith("/admin"));
                    history.push("/adminsignin");
                    console.log(this.props.location)
                    openNotificationWithIcon('error',"Not authorized to Access this route");

                    this.state.isAuthenticated=false;
                }
                else if(this.props.location.pathname.startsWith("/candidate")&& role!="0"){
                    history.push("/signin");
                    openNotificationWithIcon('error',"Not authorized to Access this route");

                    this.state.isAuthenticated=false;
                }s
                else if(this.props.location.pathname.startsWith("/recruiter")&& role!="1"){
                    history.push("/signin");
                    openNotificationWithIcon('error',"Not authorized to Access this route");

                    this.state.isAuthenticated=false;

                }
            }
            // role= 0, /admin <Login> : path



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
    
    return connect(mapStateToProps,{})(authControl);
}


