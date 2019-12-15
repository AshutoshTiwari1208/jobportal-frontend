import { AVAILABLE_JOBS, APPLY_JOB,DELETE_A_JOB,ALL_JOBS,POST_JOB,POSTED_JOBS } from './../../constants/APIS';

export const availablejobs=(userId) => (dispatch,getState,{axios})=>{
    return new axios.get(AVAILABLE_JOBS,userId).then(response=>{
        return response.data;
    })
}

export const applyForJob=(jobId)=>(dispatch,getState,{axios})=>{
    let APPLY=APPLY_JOB.replace(":jobId", jobId);
    return new axios.post(APPLY).then(response=>{
        return response.data;
    })
}

export const deleteJob=(jobId)=>(dispatch,getState,{axios})=>{
    let DEL_JOB=DELETE_A_JOB.replace(":jobId",jobId);
    return new axios.delete(DEL_JOB).then(response=>{
        return response.data;
    })
}

export const allJobs=()=>(dispatch,getState,{axios})=>{
    return new axios.get(ALL_JOBS).then(response=>{
        return response.data;
    }) 
}

export const postJob=(jobData)=>(dispatch,getState,{axios})=>{
    return new axios.post(POST_JOB,jobData).then(response=>{
        return response.data;
    })
}

export const allJobsByRecruiter=()=>(dispatch,getState,{axios})=>{
    return new axios.get(POSTED_JOBS).then(response=>{
        return response.data;
    })
}