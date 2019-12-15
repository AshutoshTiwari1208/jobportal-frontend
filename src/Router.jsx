import React, { Component } from 'react'
import { BrowserRouter as AppRouter, Route } from 'react-router-dom';

import Home from './screens/Home';
import App from './App';
import { Signup } from './screens/Signup';
import { Signin } from './screens/Signin';
import {CandidateJobs}  from './screens/CandidateHome'
import AdminHome from './screens/AdminHome'
import CandidateList from './screens/CandidateList'
import RecruiterList from "./screens/RecruiterList"
import JobHome from "./screens/JobsList"
import {RecruiterPostJobs} from "./screens/RecruiterHome";
import PostedJobs from "./screens/PostedJobs";
import ApplicantsForJob from "./screens/ApplicantsToJob"
import {ForgetPass} from "./screens/ForgetPassword";

export const Router = () => (
    <AppRouter>
        <Route exact path="/"           component={Home} />
        <Route path="/signup"           component={Signup} />
        <Route path="/signin"           component={Signin} />
        <Route path="/dashboard"        component={App} />
        <Route exact  path ="/candidate/jobs" component={CandidateJobs}/>
        <Route path ="/admin/candidates/"  component={CandidateList} />
        <Route path ="/admin/recruiters/"   component={RecruiterList} />
        <Route path="/admin/jobs" component={JobHome} />
        <Route exact path='/admin' component={AdminHome} />
        <Route exact path ="/recruiter" component={RecruiterPostJobs}  />
        <Route exact path="/recruiter/jobs" component={PostedJobs} />
        <Route  path="/recruiter/jobs/:jobId" component={ApplicantsForJob} />
        <Route path="/forgetpassword" component={ForgetPass} />

    </AppRouter>
)