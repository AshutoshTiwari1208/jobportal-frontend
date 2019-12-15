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
 
    if(err.response.status==422){
        alert(err.response.data.errors);

    }
    else if(err.response.data.code==401){

        alert(err.response.data.errors);
    }
    // else if(err.respone.status==401){
    //     alert(err.response.data.errors);
    // }
       return Promise.reject(err) //what doing????

})
