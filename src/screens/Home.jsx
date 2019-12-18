import React, { Component } from 'react';
import Navbar from './../components/Navbar';

export default class Home extends Component {
    render() {
        return (
            <div>
                <Navbar text="sign in" to="/signin"/>   
            </div>
        )
    }
}
