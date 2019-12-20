import React, { Component } from 'react'
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import RecruiterList from '../components/RecruiterList';
import {SIGNOUT} from "../constants/Routes";

 class RecruiterHome extends Component {
    state = {
        initLoading: false,
        loading: false,
        data: [],
      };

    render() {
      document.title = "Recruiter List";

        return (
            <div>
                <div>
                  <Navbar text="Logout" to={SIGNOUT}/>
                </div>
                <div align="left" className="linksDivLeft">
                  <Link to="/admin"><span  className="links"><u>Dashboard</u></span></Link>
                </div> 
                <div className="listCards">
                  <RecruiterList />
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

  export default  connect(mapStateToProps)(RecruiterHome);



