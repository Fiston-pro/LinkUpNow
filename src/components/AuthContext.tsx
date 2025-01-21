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
import { collection, orderBy, limit, getDocs, query, doc, setDoc, getDoc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { useRouter } from 'next/navigation';

const provider = new GoogleAuthProvider();
// Type interface
export interface UserType {
    email: string | null;
    uid: string | null;
    plansJoined: string[] | null;
    plansCreated: string[] | null;
    name: string | null;
    createdAt?: any;
}

export interface HostelType {
    id: string; // Firestore-generated ID
    name: string;
    location: string; // e.g., "Bali, Indonesia"
    plans: string[]; // Array of `planId`s
    createdBy: string; // userId of the creator (e.g., admin/owner)
  };

export interface PlanType { 
    id: string; // Firestore-generated ID
    name: string; // Name of the plan (e.g., "Beach Cleanup")
    description: string; // Plan description
    eventTime: string; // When the plan happens
    hostelId: string; // Reference to the associated hostel (hostelId)
    createdBy: string; // userId of the creator
    participants: string[]; // Array of userIds
    maxParticipants?: number; // Optional maximum number of participants
    createdAt: string; // Timestamp of creation
  };
  

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
    const [hostels, setHostels] = useState<HostelType[]>([]);

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
        setUser(docSnap.data() as UserType);
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


    // Admin stuff
    // Function to add a new hostel
    const addHostel = async (name: string, location: string) => {
      // add the hostel to the firebase database
      const hostelId = `${Date.now()}`;
      console.log('hostelId:', hostelId);

      const hostelsRef = collection(db, "hostels");
      await setDoc(doc(hostelsRef, hostelId), {
        id: hostelId,
        name: name,
        location: location,
        plans: [],
        createdBy: user.uid,
      });
      return await refreshHostels();
    };

    // Function to fetch plans for a specific hostel
    const fetchPlansForHostel = (hostelId: string): Plan[] => {
      const hostel = hostels.find((h) => h.id === hostelId);
      return hostel ? hostel.plans : [];
    };

    // Function to add a new plan to a hostel
    // const addPlan = (hostelId: string, plan: Omit<PlanType, 'id'>) => {
    //       setHostels((prev) =>
    //       prev.map((hostel) => {
    //           if (hostel.id === hostelId) {
    //           return {
    //               ...hostel,
    //               plans: [
    //               ...hostel.plans,
    //               { id: `${Date.now()}`, ...plan }, // Generate a unique ID for the plan
    //               ],
    //           };
    //           }
    //           return hostel;
    //       })
    //       );
    //   };

    const refreshHostels = async () => {
      // Fetch the hostels from the database
      const hostelsRef = collection(db, "hostels");
      const hostelsSnapshot = await getDocs(hostelsRef);
      const hostelsData = hostelsSnapshot.docs.map((doc) => doc.data() as HostelType);
      console.log(hostelsData);
      return hostelsData;
    }

    const deleteHostel = async (hostelId: string) => {
      
      console.log('delete hostel')
      console.log('hostelId:', hostelId);
      // delete the hostel from the firebase database
      const hostelsRef = collection(db, "hostels");
      await deleteDoc(doc(hostelsRef, hostelId));

      return await refreshHostels();
    }

    const addNewPlan = async (name: string, description: string, eventTime: Date, hostelId: string ) => {

      // add the plan to the firebase database
      const planId = `${Date.now()}`;
      console.log('planId:', planId);

      const plansRef = collection(db, "plans");
      await setDoc(doc(plansRef, planId), {
        id: planId,
        name: name,
        description: description,
        eventTime: eventTime,
        hostelId: hostelId,
        createdBy: user.uid,
        participants: [user.uid],
        createdAt: serverTimestamp(),
      });

      // Update the hostel with the new plan
      const hostelsRef = collection(db, "hostels");
      const hostelDoc = doc(db, "hostels", hostelId);
      const hostelSnap = await getDoc(hostelDoc);
      if (hostelSnap.exists()) {
        const hostelData = hostelSnap.data() as HostelType;
        await setDoc(hostelDoc, {
          ...hostelData,
          plans: [...hostelData.plans, planId],
        });
      }

      return await fetchPlansForHostel(hostelId);
    }

    // Wrap the children with the context provider
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, googleSignIn, logOut, SignUpWithGoogle, addHostel, fetchPlansForHostel, refreshHostels, deleteHostel, addNewPlan }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};