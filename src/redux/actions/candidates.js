import { ALL_CANDIDATES,DELETE_A_CANDIDATE,GET_CANDIDATE_BY_JOBID } from './../../constants/APIS';
// import { browserHistory } from 'react-router'

export const allCandidates=() => (dispatch,getState,{axios})=>{
    return new axios.get(ALL_CANDIDATES).then(response=>{
        console.log("$$$$$$$$$$",response.data);
        return response.data;
    })
}

export const candidateDelete=(candidateUuid)=> (dispatch,getState,{axios})=>{
    let DEL_CANDI=DELETE_A_CANDIDATE.replace(":candidateId", candidateUuid);

    return new axios.delete(DEL_CANDI).then(response=>{
        console.log("@@@@@@@@",response.data);
        return response.data;
    })
}


export const getAppliedCandidates=(jobId)=>(dispatch,getState,{axios})=>{
    let JOB_ID=GET_CANDIDATE_BY_JOBID.replace(":jobId",jobId);

    return new axios.get(JOB_ID).then(response=>{
        return response.data;
    })
}