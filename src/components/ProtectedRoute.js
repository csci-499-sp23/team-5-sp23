import React from 'react';
import {Navigate} from 'react-router-dom';
import {UserAuth} from '../context/UserAuthContext';

const ProtectedRoute = ({children}) => {

    const {user} = UserAuth();

    if(!user){
        return <Navigate to='/' />
    }
    console.log(user);
    return children

}

export default ProtectedRoute;