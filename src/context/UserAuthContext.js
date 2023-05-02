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
    const [user, setUser] = useState(Object)
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password);
    };
    
    const signIn = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logoutAccount = () =>{
        signOut(auth).then(() =>{
            console.log("Signed_out!!!!")
        });
        console.log(user);
        return
    };


    useEffect(() =>{
        const unsuscribe = onAuthStateChanged(auth, (currentUser) =>{
            
            //console.log("This is the user")
            setUser(currentUser);
            //console.log(user.email);
            //console.log("This is the users email: ")
            
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
