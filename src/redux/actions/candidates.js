import { ALL_CANDIDATES,DELETE_A_CANDIDATE,GET_CANDIDATE_BY_JOBID } from './../../constants/APIS';

export const allCandidates=(meta) => (dispatch,getState,{axios})=>{
    return new axios.get(ALL_CANDIDATES,{params:meta}).then(response=>{
        return response;
    })
}

export const candidateDelete=(candidateUuid)=> (dispatch,getState,{axios})=>{
    let DEL_CANDI=DELETE_A_CANDIDATE.replace(":candidateId", candidateUuid);

    return new axios.delete(DEL_CANDI).then(response=>{
        return response.data;
    })
}


export const getAppliedCandidates=(jobId,meta)=>(dispatch,getState,{axios})=>{
    let JOB_ID=GET_CANDIDATE_BY_JOBID.replace(":jobId",jobId);

    return new axios.get(JOB_ID,{ params: meta}).then(response=>{
        return response;
    })
}