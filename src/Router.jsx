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
import {ResetPass} from "./screens/ResetPassword";
import {ForgetPassStep} from "./screens/ForgetPassSteps";
import AppliedJobs from "./screens/AppliedJobs";
import {AuthenticationControl} from "./components/AuthenticationControl";
import {SigninAdmin} from "./screens/AdminSignin";
export const Router = () => (
    <AppRouter>
        <Route exact path="/"           component={Home} />
        <Route path="/signup"           component={Signup} />
        <Route path="/signin"           component={Signin} />
        <Route path="/dashboard"        component={App} />
        <Route exact  path ="/candidate/jobs" component={AuthenticationControl(CandidateJobs)}/>
        <Route path ="/admin/candidates/"   component={AuthenticationControl(CandidateList)} />
        <Route path ="/admin/recruiters/"   component={AuthenticationControl(RecruiterList)} />
        <Route path="/admin/jobs" component={AuthenticationControl(JobHome)} />
        <Route exact path='/admin' component={AuthenticationControl(AdminHome)} />
        <Route exact path ="/recruiter" component={AuthenticationControl(RecruiterPostJobs)}  />
        <Route exact path="/recruiter/jobs" component={AuthenticationControl(PostedJobs)} />
        <Route  path="/recruiter/jobs/:jobId" component={AuthenticationControl(ApplicantsForJob)} />
        <Route path="/forgetpassword" component={ForgetPass} />
        <Route path="/resetpassword" component={ResetPass} />
        <Route path="/resetpasswordsteps" component={ForgetPassStep} />
        <Route path="/candidate/jobs/applications" component={AuthenticationControl(AppliedJobs)} />
        <Route path="/adminsignin" component={SigninAdmin}/>
    </AppRouter>
)