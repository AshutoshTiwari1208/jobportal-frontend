import { ALL_RECRUITERS,DELETE_A_RECRUITER } from './../../constants/APIS';
// import { browserHistory } from 'react-router'

export const allRecruiters=(meta)=>(dispatch,getState,{axios})=>{
    return new axios.get(ALL_RECRUITERS,{params:meta}).then(response=>{
        return response;
    })
}

export const recruiterDelete=(recruiterUuid)=>(dispatch,getState,{axios})=>{
    let DEL_RECRUITER=DELETE_A_RECRUITER.replace(":recruiterId",recruiterUuid);
   
    return axios.delete(DEL_RECRUITER).then(response=>{
        return response.data;
    })
}



