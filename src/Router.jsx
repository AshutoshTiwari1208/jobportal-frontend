import React, { Component } from 'react'
import { BrowserRouter as AppRouter, Route,Switch } from 'react-router-dom';
import App from './App';
import { Signup } from './screens/Signup';
import { Signin } from './screens/Signin';
import {CandidateJobs}  from './screens/CandidateHome'
import AdminHome from './screens/AdminHome'
import CandidateList from './screens/CandidateList'
import RecruiterList from "./screens/RecruiterList"
import JobHome from "./screens/JobsList";
import {RecruiterPostJobs} from "./screens/RecruiterHome";
import PostedJobs from "./screens/PostedJobs";
import ApplicantsForJob from "./screens/ApplicantsToJob";
import {ForgetPass} from "./screens/ForgetPassword";
import {ResetPass} from "./screens/ResetPassword";
import {ForgetPassStep} from "./screens/ForgetPassSteps";
import AppliedJobs from "./screens/AppliedJobs";
import {AuthenticationControl} from "./components/AuthenticationControl";
import {SigninAdmin} from "./screens/AdminSignin";
import {NoMatch} from "./components/NoMatch";
// import {SIGNIN_ROUTE} from "./constants/Routes";


export const Router = () => (
    <AppRouter>
        <Switch>
        <Route exact path="/"           component={Signin} />
        <Route exact path="/signup"           component={Signup} />
        <Route exact path="/dashboard"        component={App} />
        <Route exact path ="/candidate/jobs" component={AuthenticationControl(CandidateJobs)}/>
        <Route exact path ="/admin/candidates/"   component={AuthenticationControl(CandidateList)} />
        <Route exact path ="/admin/recruiters/"   component={AuthenticationControl(RecruiterList)} />
        <Route exact path="/admin/jobs" component={AuthenticationControl(JobHome)} />
        <Route exact path='/admin' component={AuthenticationControl(AdminHome)} />
        <Route exact path ="/recruiter" component={AuthenticationControl(RecruiterPostJobs)}  />
        <Route exact path="/recruiter/jobs" component={AuthenticationControl(PostedJobs)} />
        <Route  path="/recruiter/jobs/:jobId" component={AuthenticationControl(ApplicantsForJob)} />
        <Route exact path="/forgetpassword" component={ForgetPass} />
        <Route exact path="/resetpassword" component={ResetPass} />
        <Route exact exact  path="/signin" component={Signin} />
        <Route exact path="/resetpasswordsteps" component={ForgetPassStep} />
        <Route exact path="/candidate/jobs/applications" component={AuthenticationControl(AppliedJobs)} />
        <Route exact path="/adminsignin" component={SigninAdmin}/>
        <Route path="*">
            <NoMatch/>
        </Route>
        </Switch>
    </AppRouter>
)