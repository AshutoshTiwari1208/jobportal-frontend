export default function(state={
    userdetails:{}   
}, action){
    console.log(action)
    switch(action.type){

        case "SIGNIN_USER" : return {
            ...state,
            userdetails: action.payload,
        }
        case "SIGNUP_USER": return{
            ...state,
            userdetails:action.payload,
        }
        case "LOGOUT_USER": return{
            ...state,
            userdetails:null
        }
        default: 
            return state
    }
}