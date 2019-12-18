import React, { Component } from 'react'
import {
  Form,
} from 'antd';

import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'
import {availablejobs} from "../redux/actions/jobs";
import {connect} from "react-redux";
import JobsView from '../components/JobsView'
import {SIGNOUT,VIEW_APPLIED_JOBS} from "../constants/Routes";


class CandidateHome extends React.Component {
  state = {
    initLoading: false,
    loading: false,
    data: [],
    current:1
  };

  onChange = page => {
    this.setState({
      current: page,

    });
  };

  render() {
    const { availablejobs } = this.props; 
    return (
      <div>
          <Navbar text="Logout" to={SIGNOUT}/>
          <div align="left">
             <Link to={VIEW_APPLIED_JOBS}><span  className="links"><u>View Applied Jobs</u></span></Link>
          </div> 
          <div className="listCards" >
            <JobsView  availablejobs={availablejobs}/>
          </div>
      </div>
    )
  }
}

const mapStateToProps=state=>{ 
  return{
    userData:state
  }
}

CandidateHome=connect(mapStateToProps,{availablejobs})(CandidateHome);
export const CandidateJobs = Form.create({ name: 'candidateJobs' })(CandidateHome);

