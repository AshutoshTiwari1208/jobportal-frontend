import React, { Component } from 'react'
import {Link} from "react-router-dom";
export  class NoMatch extends Component {
    render() {
        return (
            <div>
                <h2><center>You have lost your way</center></h2>
                <center> <Link to="/signin">Click here to go to Sign in page</Link>
                </center>
                <hr/>
                <center><h1>404</h1></center>
                </div>
        )
    }
}
