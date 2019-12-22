import React, { Component } from 'react'
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'
import {connect} from "react-redux";
import CandidateList from '../components/CandidatesList';
import {SIGNOUT} from "../constants/Routes";

class CandidateHome extends React.Component {
  state = {
    initLoading: false,
    loading: false,
    data: [],
  };

  render() {
    document.title = "Candidate List";


    const { allCandidates } = this.props; 
    return (
    <div>
        <div>
            <Navbar text="Logout" to={SIGNOUT}/>
        </div>
        <div align="left" className="linksDivLeft">
            <Link to="/admin"><span  className="links"><u>Dashboard</u></span></Link>
        </div> 
        <div className="listCards">
      <CandidateList allCandidates={allCandidates}/>
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

export default connect(mapStateToProps)(CandidateHome);