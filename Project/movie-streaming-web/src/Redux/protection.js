import { logoutAction } from "./Actions/userActions.js";

export const ErrorsAction = (error, dispatch, action) =>{
    const message = error.responce && error.responce.data.data.message 
    ? error.responce.data.message 
    : error.message;
    if(message ===" Not authorized, token failed"){
        dispatch(logoutAction());
    }
    return dispatch({type: action, payload: message});
};



//Api token protection
export const tokenProtection = (getState) => {
    const {
        userLogin: {userInfo},
    } = getState();
    if(!userInfo?.token) {
        return null;
    }
    else{
        return userInfo?.token
    }
};