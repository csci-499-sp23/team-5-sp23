import { createContext, useContext, useEffect, useState } from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
} from 'firebase/auth'
import { auth } from '../firebase-config';

const userContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(Object)
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
        
    };
    const updateUserName = (name)  => {
        return updateProfile(user, {displayName:name});
    }
    
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logoutAccount = () =>{
        return signOut(auth);
        
    };


    useEffect(() =>{
        const unsuscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });
        return () => {
            unsuscribe();
        };
    }, );
    
    return (
        <userContext.Provider value={{createUser, user, logoutAccount, signIn, updateUserName}}>
            {children}
        </userContext.Provider>
    )
};

export const UserAuth = () => {
    return useContext(userContext)
}
