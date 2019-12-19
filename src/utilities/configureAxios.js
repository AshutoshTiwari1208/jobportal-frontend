import axios from 'axios';
import {notification} from 'antd';

const configureAxios = () => {
    return axios.create({
        baseURL: process.env.REACT_APP_BASE_URL,
        timeout: 30000
    })
}
const openNotificationWithIcon = (type,message,desc) => {
    notification[type]({
        message: message,
        description: desc,
    });
  };
  
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
    const saveError=err.response.data.errors;

    console.log("ERROR HANDLED:",err.response);
    if(err.response.status==422){
        openNotificationWithIcon('error',"ERROR OCCURED",saveError);


    }
    else if(err.response.data.code==401){

        openNotificationWithIcon('error',"ERROR OCCURED",saveError);
    }
    else{
        openNotificationWithIcon('error',"ERROR OCCURED",saveError);

    }
   
       return Promise.reject(err) //what doing????

})
