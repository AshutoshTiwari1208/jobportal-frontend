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
import JobsList from '../components/JobsView'
import AppliedJobsList from '../components/AppliedJobsList';

class AppliedJobs extends React.Component {
  state = {
    initLoading: false,
    loading: false,
    data: [],
  };



  render() {

    const { allCandidates } = this.props; //took out function and passed
    return (
    <div>
      {/* <Navbar/> */}
      <AppliedJobsList allCandidates={allCandidates}/>
      {/* <Footer/> */}
    </div>
    )
  }
}
const mapStateToProps=state=>{
  return{
    candidateData:state
  }
}


// CandidateHome=connect(mapStateToProps,{availablejobs})(CandidateHome);

export default connect(mapStateToProps)(AppliedJobs);



