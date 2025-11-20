import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { app } from '../firebase/firebase.config';
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";

export const AuthContext = createContext()
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
const Authprovider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    console.log(user)


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };
    const updateUser = (updatedData) => {
        return updateProfile(auth.currentUser, updatedData);
    };
    const logOut = () => {
        return signOut(auth);
    };
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };
    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };
    const resetPassword = (email) => {
        setLoading(true);
        return sendPasswordResetEmail(auth, email);
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
       
        return () => {
            unsubscribe();
        };
    }, []);
    const authData = {
        user,
        setUser,
        createUser,
        signIn,
        logOut,
        updateUser,
        googleLogin,
        resetPassword,
        loading,
    }
    return <AuthContext value={authData}>{children}</AuthContext>
};

export default Authprovider;