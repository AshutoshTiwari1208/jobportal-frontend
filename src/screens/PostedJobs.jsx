import React, { Component } from 'react'
import {connect} from "react-redux";
import PostedJobList from "../components/JobsByRecruiter"
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'

 class PostedJobs extends Component {
    state = {
        initLoading: false,
        loading: false,
        data: [],
      };

    render() {
        return (
            <div>
                <Navbar text="Logout" to="/signout"/>
                <div align="left">
                    <Link to="/recruiter"><span  className="links"><u>Post a Job !!</u></span></Link>
                </div> 
                <div className="listCards">
                    <PostedJobList />
                </div>     
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
      candidateData:state
    }
  }

  export default  connect(mapStateToProps)(PostedJobs);



