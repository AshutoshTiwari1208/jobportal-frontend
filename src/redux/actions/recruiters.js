import { ALL_RECRUITERS,DELETE_A_RECRUITER } from './../../constants/APIS';
// import { browserHistory } from 'react-router'

export const allRecruiters=()=>(dispatch,getState,{axios})=>{
    return new axios.get(ALL_RECRUITERS).then(response=>{
        console.log("$$$$$$ALLRECRUITERS::",response.data);
        return response.data;
    })
}

export const recruiterDelete=(recruiterUuid)=>(dispatch,getState,{axios})=>{
    let DEL_RECRUITER=DELETE_A_RECRUITER.replace(":recruiterId",recruiterUuid);
   
    return axios.delete(DEL_RECRUITER).then(response=>{
        console.log("$$$$$$$$AFTER REC DELETE DATA",response.data);
        return response.data;
    })
}



