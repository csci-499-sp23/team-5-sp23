import { createContext, useContext, useEffect, useState } from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import { auth } from '../firebase-config';

const userContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState({})

    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logoutAccount = () =>{
        return signOut(auth);
    };

    useEffect(() =>{
        const unsuscribe = onAuthStateChanged(auth, (currentUser) =>{
            console.log(user);
            setUser(currentUser);
        });
        return () => {
            unsuscribe();
        };
    }, );
    
    return (
        <userContext.Provider value={{createUser, user, logoutAccount, signIn}}>
            {children}
        </userContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(userContext)
}