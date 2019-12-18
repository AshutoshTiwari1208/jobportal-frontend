export default function(state={
    userdetails:{}   
}, action){
    switch(action.type){

        case "SIGNIN_USER" : return {
            userdetails: action.payload,
        }
        case "SIGNUP_USER": return{
            userdetails:action.payload,
        }
        case "SIGNOUT" : return {
            userdetails:{}
        }
        default: 
            return state
    }
}