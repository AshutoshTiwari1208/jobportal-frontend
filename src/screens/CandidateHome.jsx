import React, { Component } from 'react'
import { List,
  Form,
  Avatar,
  Button,
  Skeleton } from 'antd';

import reqwest from 'reqwest';
import {availablejobs} from "../redux/actions/jobs";
import {connect} from "react-redux";
import store from '../redux/store';//remove---
import JobsList from './../components/JobsList'


class CandidateHome extends React.Component {
  state = {
    initLoading: false,
    loading: false,
    data: [],
  };


  render() {

    const { availablejobs } = this.props; //took out function and passed
    return (
    <div>
      {/* <Navbar/> */}
      <JobsList  availablejobs={availablejobs}/>
      {/* <Footer/> */}
    </div>
    )
  }
}


const mapStateToProps=state=>{ //store se data available karayega
  return{
    userData:state
  }
}


CandidateHome=connect(mapStateToProps,{availablejobs})(CandidateHome);
//dusra argument function available karayega..

export const CandidateJobs = Form.create({ name: 'candidateJobs' })(CandidateHome);

