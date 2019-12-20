import { USER_SIGNUP,USER_SIGNIN,FORGET_PASSWORD,RESET_PASSWORD } from './../../constants/APIS';
import { browserHistory } from 'react-router'



export const signup=(signupData) => (dispatch, getState, {axios}) =>{
    return new axios.post(USER_SIGNUP, signupData).then(response=>{
            let userDetail=response.data;
            dispatch({
                type:"SIGNUP_USER",
                payload:userDetail
            });
           
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
    return new axios.post(FORGET_PASSWORD,{ email: emailPassed.email} ).then(response=>{
        return response.data;
    })
}

export const resetpassword =(resetData) => (dispatch,getState,{axios})=>{
    return new axios.post(RESET_PASSWORD,resetData).then(response=>{
        return response.data;
    })
}

export const signout=()=>(dispatch,getState,{axios}) =>{
    dispatch({
        type:"SIGNOUT",
        payload:null
    });
    axios.defaults.headers.common["Authorization"]="";
    return null;


}