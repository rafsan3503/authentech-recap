import React, { createContext, useEffect, useState } from 'react';
import {getAuth, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, TwitterAuthProvider} from 'firebase/auth'
import app from '../firebase/firebase.init';

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const twitterProvider = new TwitterAuthProvider();

const UserContext = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
       const unsubscribe = onAuthStateChanged(auth, currentUser => {
           setUser(currentUser);
           setLoading(false)
       });
        return () => unsubscribe();
    }, []);

    const googleLogIn = () => {
        return signInWithPopup(auth, googleProvider);
    }

    const githubLogIn = () => {
        return signInWithPopup(auth, githubProvider);
    }

    const twitterLogIn = () => {
        return signInWithPopup(auth, twitterProvider);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = {
      user,
      googleLogIn,
      githubLogIn,
      twitterLogIn,
      logOut,
      loading,
    };
    return (
      <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
      </div>
    );
};

export default UserContext;