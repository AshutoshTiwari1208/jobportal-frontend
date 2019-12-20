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
import {SIGNIN,SIGNUP,CANDIDATE_HOME, NO_MATCH, ADMIN_SIGNIN, VIEW_APPLIED_JOBS,RESET_PASWORD,APPLICANT_FOR_JOB_ROUTE,FORGOT_PASSWORD,ALL_CANDIDATES,ALL_JOBS,ALL_RECRUITERS, ADMIN_DASHBOARD,RECRUITER_HOME,RECRUITER,RESET_PASSWORD}  from "./constants/Routes";
// import {SIGNIN_ROUTE} from "./constants/Routes";


export const Router = () => (
    <AppRouter>
        <Switch>
        <Route exact path={SIGNIN}          component={Signin} />
        <Route exact path={SIGNUP}           component={Signup} />
        <Route exact path="/dashboard"        component={App} />
        <Route exact path ={CANDIDATE_HOME} component={AuthenticationControl(CandidateJobs)}/>
        <Route exact path ={ALL_CANDIDATES}   component={AuthenticationControl(CandidateList)} />
        <Route exact path ={ALL_RECRUITERS}   component={AuthenticationControl(RecruiterList)} />
        <Route exact path={ALL_JOBS} component={AuthenticationControl(JobHome)} />
        <Route exact path={ADMIN_DASHBOARD} component={AuthenticationControl(AdminHome)} />
        <Route exact path ={RECRUITER} component={AuthenticationControl(RecruiterPostJobs)}  />
        <Route exact path={RECRUITER_HOME} component={AuthenticationControl(PostedJobs)} />
        <Route  path={APPLICANT_FOR_JOB_ROUTE} component={AuthenticationControl(ApplicantsForJob)} />
        <Route exact path={FORGOT_PASSWORD} component={ForgetPass} />
        <Route exact path={RESET_PASWORD} component={ResetPass} />
    <Route exact exact  path={SIGNIN} component={Signin} />
        <Route exact path={RESET_PASSWORD} component={ForgetPassStep} />
        <Route exact path={VIEW_APPLIED_JOBS} component={AuthenticationControl(AppliedJobs)} />
        <Route exact path={ADMIN_SIGNIN} component={SigninAdmin}/>
        <Route path={NO_MATCH}>
            <NoMatch/>
        </Route>
        </Switch>
    </AppRouter>
)


