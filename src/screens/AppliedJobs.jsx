import React, { Component } from 'react'

import {connect} from "react-redux";
import AppliedJobsList from '../components/AppliedJobsList';
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'
import {SIGNOUT,AVAILABLE_JOBS} from "../constants/Routes";

class AppliedJobs extends React.Component {
  state = {
    initLoading: false,
    loading: false,
    data: [],
  };

  
  render() {
    document.title = "Applied Jobs";


    const { allCandidates } = this.props; //took out function and passed
    return (
    <div>
      <div>
        <Navbar text="Logout" to={SIGNOUT}/>
     </div>
     <div align="left">
        <Link to={AVAILABLE_JOBS}><span  className="links"><u>View Available Jobs</u></span></Link>
    </div > 
    <div className="listCards">
       <h2><center>Your Applied Jobs</center></h2>
      <AppliedJobsList allCandidates={allCandidates}/>
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

export default connect(mapStateToProps)(AppliedJobs);



