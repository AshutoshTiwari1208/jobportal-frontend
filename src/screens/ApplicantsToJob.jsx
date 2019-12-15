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
import JobsList from '../components/JobsList'
import RecruiterList from '../components/RecruiterList';
import ApplicantsList from "../components/ApplicantList.jsx";


 class ApplicantsForJob extends Component {
    state = {
        initLoading: false,
        loading: false,
        data: [],
      };

    render() {
        return (
            <div>
                 {/* <Navbar/> */}
                  <ApplicantsList jobId={this.props.match.params.jobId}/>
                  {/* <h1>dffsdf</h1> */}
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

  export default  connect(mapStateToProps)(ApplicantsForJob);
