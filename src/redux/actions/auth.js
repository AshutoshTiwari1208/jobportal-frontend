import { USER_SIGNUP,USER_SIGNIN,FORGET_PASSWORD } from './../../constants/APIS';
import { browserHistory } from 'react-router'
// import { Signin } from '../../screens/Signin';


// export const applyJob = (id) => (dispatch, getState, {axios}) => {//import?

//     let endpoint = APIS.APPLY_JOB.replace(':jobID', id);

//     return new axios.post(endpoint, null).then( res => {
//         const { data } = res.data;
//         dispatch({
//         type: TYPES.APPLY_JOB
//         })
//         return res;
//     })
// } 

// export const login = (loginData) => (dispatch, getState, {axios}) => {

//     let API = APIS.APPLY_JOB.replace(':jobID', id);

//     return new axios.post(API, null).then( res => {
//         const { data } = res.data;
//         dispatch({
//         type: TYPES.APPLY_JOB
//         })
//         return res;
//     })
// } 

export const signup=(signupData) => (dispatch, getState, {axios}) =>{
    return new axios.post(USER_SIGNUP, signupData).then(response=>{
            let userDetail=response.data;
         
            dispatch({
                type:"SIGNUP_USER",
                payload:userDetail
            });
            // if(response.status===200){
            //     console.log("######",response.data.data);
            // }
            // console.log("##########",reponse.data);
            axios.defaults.headers.common['Authorization'] =`Bearer ${userDetail.token}`;

            return response.data;
    })
}
export const signin=(signinData) =>(dispatch,getState,{axios})=>{
    return new axios.post(USER_SIGNIN,signinData).then(response=>{
        let userDetail=response.data;

        dispatch({
            type:"SIGNIN_USER",
            payload:userDetail
        });
        axios.defaults.headers.common["Authorization"]= `Bearer ${userDetail.token}`;
        return response.data;
    })
}

export const forgetpassword=(emailPassed)=>(dispatch,getState,{axios})=>{
    // console.log("INSIDE ACTION:::::",emailPassed,emailPassed.username);
    return new axios.post(FORGET_PASSWORD,emailPassed.username).then(response=>{
       console.log("WWWWWW RESPONSE:::",response);
        return response.data;
    })
}
