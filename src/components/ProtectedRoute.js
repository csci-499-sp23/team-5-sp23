import React from 'react';
import {Navigate} from 'react-router-dom';
import {UserAuth} from '../context/UserAuthContext';

const ProtectedRoute = ({children}) => {
    
    const {user} = UserAuth();
    console.log("This is user")
    console.log(user)
    if(!user){
        console.log("Return to home")
        return <Navigate to='/' />
    }
    //console.log(user);
    return children

}

export default ProtectedRoute;