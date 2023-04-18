import React, { Children } from 'react';
import {Navigate} from 'react-router-dom';
import {UserAuth} from '../context/UserAuthContext';

const ProtectedRoute = ({Children}) => {

    const {user} = UserAuth();

    if(!user){
        return <Navigate to='/' />
    }
    console.log(user);
    return Children

}

export default ProtectedRoute;