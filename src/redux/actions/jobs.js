import { AVAILABLE_JOBS, APPLY_JOB,DELETE_A_JOB,ALL_JOBS,POST_JOB,POSTED_JOBS,APPLIED_JOBS } from './../../constants/APIS';

export const availablejobs= (meta) => (dispatch,getState,{axios})=>{
    console.log(meta)
    return new axios.get(AVAILABLE_JOBS,{ params: meta} ).then(response=>{
        return response;//changed .data
    })
}

export const applyForJob=(jobId)=>(dispatch,getState,{axios})=>{
    let APPLY=APPLY_JOB.replace(":jobId", jobId);
    return new axios.post(APPLY).then(response=>{
        console.log("APPLY FOR ###",response);
        return response;
    })
}

export const deleteJob=(jobId)=>(dispatch,getState,{axios})=>{
    let DEL_JOB=DELETE_A_JOB.replace(":jobId",jobId);
    return new axios.delete(DEL_JOB).then(response=>{
        return response.data;
    })
}

export const allJobs=(meta)=>(dispatch,getState,{axios})=>{
    return new axios.get(ALL_JOBS,{params:meta}).then(response=>{
        return response;
    }) 
}

export const postJob=(jobData)=>(dispatch,getState,{axios})=>{
    return new axios.post(POST_JOB,jobData).then(response=>{
        return response.data;
    })
}

export const allJobsByRecruiter=(meta)=>(dispatch,getState,{axios})=>{
    return new axios.get(POSTED_JOBS,{params:meta}).then(response=>{
        return response.data;
    })
}


export const appliedjobslist=(meta)=>(dispatch,getStet,{axios})=>{
    return new axios.get(APPLIED_JOBS,{params:meta}).then(response=>{
        return response;
    })
}