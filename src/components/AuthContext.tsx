'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    getRedirectResult, 
    signInWithPopup,
    signOut
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase/initFirebase';
import { collection, orderBy, limit, getDocs, query, doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from 'next/navigation';

const provider = new GoogleAuthProvider();
// User data type interface
interface UserType {
    email: string | null;
    uid: string | null;
    plansJoined: string[] | null;
    plansCreated: string[] | null;
    name: string | null;
    createdAt?: any;
}

// Create auth context
const AuthContext = createContext({});

// Make auth context available across the app by exporting it
export const useAuth = () => useContext<any>(AuthContext);

// Create the auth context provider
export const AuthContextProvider = ({
    children
}: {
    children: React.ReactNode;
}) => {
    // Define the constants for the user and loading state
    const [user, setUser] = useState<UserType>({ email: null, uid: null, plansJoined: null, plansCreated: null, name: null });
    const [loading, setLoading] = useState<Boolean>(true);

    const router = useRouter();

    // Update the state depending on auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    email: user.email,
                    uid: user.uid,
                    plansJoined: null,
                    plansCreated: null,
                    name: user.displayName
                });
            } else {
                setUser({ email: null, uid: null, plansJoined: null, plansCreated: null, name: null });
            }
        });

        setLoading(false);

        return () => unsubscribe();
    }, []);

    const createUser = async (uid: string, email: string|null, name: string|null ) => {
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, uid), {
          name: name, createdAt: serverTimestamp(), email: email, plansJoined: [], plansCreated: [], uid: uid
        });
       };
    
    const getUserAdditionalData = async (uid: string) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setUser(docSnap.data());
    } else {
        console.log("No such document!");
    }
    ;}

    // Sign up the user with google
    const SignUpWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          console.log( 'uid:', result.user.uid);
        const docRef = doc(db, "users", result.user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) { await createUser( result.user.uid, result.user.email, result.user.displayName)} //check if a use arleady exists before making a new one
        await getUserAdditionalData(result.user.uid);
        console.log("Signin Successfully")
        router.push('/');
        }).catch((error) => {
          console.log("Signin failed:", error);
        });
      }

    // Sign up the user
    const signUp = (email: string, password: string) => {
        return createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
            const user = userCredential.user;
            createUser(user.uid, user.email, user.displayName);
            getUserAdditionalData(user.uid);
        }  ).catch((error) => {
            console.error("Signup failed:", error);
        });

    };

    // Login the user
    const logIn = (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Logout the user
    const logOut = async () => {
        setUser({ email: null, uid: null, plansJoined: null, plansCreated: null, name: null });
        return await signOut(auth);
    };

    //login with google
    const googleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, provider);
          console.log('User signed in:', result.user);
          router.push('/');
        } catch (error) {
          console.error("Google sign-in failed:", error);
        }
      };
    
      console.log('User:', user);

    // Wrap the children with the context provider
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, googleSignIn, logOut, SignUpWithGoogle }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};