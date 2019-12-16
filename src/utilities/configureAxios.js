import axios from 'axios';

const configureAxios = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 30000
    })
}

export const axiosInstance = configureAxios(); 

//interceptors for request
axiosInstance.interceptors.request.use(async config => {
    import('./../redux/store').then( (persistStore) => {
        const { store } = persistStore.default;//??
        let state = store.getState();//??getState
        if(state.auth.userdetails){//which authuser
            config.headers.Authorization = `Bearer ${state.auth.userdetails.token}`;
        }
    })
    return await config;
})
axiosInstance.interceptors.response.use(response => {
    return response.data
}, err=>{

    // const reject = [401,];

    // reject.indexOf(err.response.status > -1){
    //     alert(err.response.data.errors);
    // }
 
    if(err.response.status==422){

    }
    else if(err.response.data.code==401){

        // alert(err.response.data.errors);
    }
    else{
        // alert(err.response.data.errors);
        console.log("EEROORRR:::::",err.response);
    }
    // else if(err.respone.status==401){
    //     alert(err.response.data.errors);
    // }
       return Promise.reject(err) //what doing????

})
