import React, { Component } from 'react';
import Navbar from './../components/Navbar';
import { Link } from 'react-router-dom'

export default class AdminHome extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <div>
                    <Link to="/admin/candidates/">All Candidates</Link>
                </div> 
                <div>
                    <Link to="/admin/recruiters/">All Recruiters</Link>
                </div> 
                <div>
                    <Link to="/admin/jobs/">All Jobs</Link>
                </div>
            </div>
        )
    }
}
