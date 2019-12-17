import React, { Component } from 'react'
import {connect} from "react-redux";
import ApplicantsList from "../components/ApplicantList.jsx";
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'
import {SIGNOUT} from "../constants/Routes";


 class ApplicantsForJob extends Component {
    state = {
        initLoading: false,
        loading: false,
        data: [],
      };

    render() {
        return (
            <div>
                <Navbar text="Logout" to={SIGNOUT}/>
                <div align="left" className="linksDivLeft">
                    <Link to="/recruiter/jobs"><span  className="links"><u>View Published Jobs</u></span></Link>
                </div> 
                <div align="right" className="linksDivRight">
                    <Link to="/recruiter"><span  className="linksRight"><u>Post New Job</u></span></Link>
                </div> 
                  <ApplicantsList jobId={this.props.match.params.jobId}/>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
      candidateData:state
    }
  }

  export default  connect(mapStateToProps)(ApplicantsForJob);
