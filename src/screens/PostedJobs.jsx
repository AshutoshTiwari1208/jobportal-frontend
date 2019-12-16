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
import PostedJobList from "../components/JobsByRecruiter"

 class PostedJobs extends Component {
    state = {
        initLoading: false,
        loading: false,
        data: [],
      };

    render() {
        return (
            <div>
                 {/* <Navbar/> */}
                  <PostedJobList />
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

  export default  connect(mapStateToProps)(PostedJobs);



