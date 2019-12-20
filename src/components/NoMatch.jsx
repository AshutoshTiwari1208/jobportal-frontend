import React, { Component } from 'react'
import {Link} from "react-router-dom";
export  class NoMatch extends Component {
    render() {
        return (
            <div>
                <div className="lostWay">
                <center><h1>404 | Unauthorized Access</h1></center>
                <center><h2><Link to="/signin"><span className="signinPage">Click here to go to Sign in page</span></Link></h2> 
                </center>
                </div>
             </div>
        )
    }
}
