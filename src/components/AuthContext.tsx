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
import { collection, orderBy, limit, getDocs, query, doc, setDoc, getDoc, serverTimestamp, deleteDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { useRouter } from 'next/navigation';

// Type interface
export interface UserType {
    email: string | null;
    uid: string | null;
    plansJoined: string[] | null;
    plansCreated: string[] | null;
    name: string | null;
    createdAt?: any;
    photoURL: string | null;
}

export interface OtherUserType {
    name: string|null;
    email: string;
    photoURL: string|null;
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
  // Chat's interfaces
export interface MessageType {
    message: string; // Message text
    timestamp: string; // Timestamp of creation
    userId: string; // userId of the sender
    name: string; // Name of the sender
    profilePic: string; // URL of the sender's profile picture
  };

export interface ChatType {
    id: string; // Firestore-generated ID
    name: string; // Name of the chat
    lastMessage: string; // Last message in the chat
    messages: MessageType[]; // Array of messages
    participants: string[]; // Array of userIds    
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
    const [user, setUser] = useState<UserType>({ email: null, uid: null, plansJoined: null, plansCreated: null, name: null, photoURL: null });
    const [loading, setLoading] = useState<Boolean>(true);
    const [hostels, setHostels] = useState<HostelType[]>([]);

    const router = useRouter();

    // Update the state depending on auth
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
              getUserAdditionalData(user.uid);
            } else {
                setUser({ email: null, uid: null, plansJoined: null, plansCreated: null, name: null, photoURL: null });
            }
        });

        setLoading(false);

        return () => unsubscribe();
    }, []);

    const createUser = async (uid: string, email: string|null, name: string|null, photoURL: string|null ) => {
        const usersRef = collection(db, "users");
        await setDoc(doc(usersRef, uid), {
          name: name, createdAt: serverTimestamp(), email: email, plansJoined: [], plansCreated: [], uid: uid, photoURL: photoURL
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
          console.log( 'all the user:', result.user);
        const docRef = doc(db, "users", result.user.uid);
        const docSnap = await getDoc(docRef);
        if (!docSnap.exists()) { await createUser( result.user.uid, result.user.email, result.user.displayName, result.user.photoURL)} //check if a use arleady exists before making a new one
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
    const fetchPlansForHostel = async  (hostelId: string): Plan[] => {
      // fetch the array of plans in the hostel data using hostelId
      const hostelsRef = collection(db, "hostels");
      const hostelDoc = doc(hostelsRef, hostelId);
      const hostelSnap = await getDoc(hostelDoc);
      if (hostelSnap.exists()) {
        const hostelData = hostelSnap.data() as HostelType;
        if (hostelData.plans) {
          const plansData = hostelData.plans.map((planId) => {
            return getPlanData(planId);
          });
          return Promise.all(plansData);
        }
      }
      return [];    
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

    //function to return all the data of the hostel, it's name, location and plans
    const getHostelData = async (hostelId: string) => {
      const hostelDoc = doc(db, "hostels", hostelId);
      const hostelSnap = await getDoc(hostelDoc);
      if (hostelSnap.exists()) {
        return hostelSnap.data() as HostelType;
      } else {
       return "No such document!";
      }
    }

    //function to return all data of the plan, it's name, description, eventTime, hostelId, createdBy, participants, maxParticipants and createdAt
    const getPlanData = async (planId: string) => {
      const planDoc = doc(db, "plans", planId);
      const planSnap = await getDoc(planDoc);
      if (planSnap.exists()) {
        return planSnap.data() as PlanType;
      } else {
       return "No such document!";
      }
    }

    //function to get user data by uid and only return the name, photoUrl and email
    const getOtherUserData = async (uid: string) => {
      const userDoc = doc(db, "users", uid);
      const userSnap = await getDoc(userDoc);
      if (userSnap.exists()) {
        return userSnap.data() as OtherUserType;
      } else {
       return "No such document!";
      }
    }

    //function to change the user's name
    const changeUserName = async (newName: string) => {
      if (user.uid) {
        const userDoc = doc(db, "users", user.uid);
        await setDoc(userDoc, {name: newName}, { merge: true });
        getUserAdditionalData(user.uid)
      } else {
        console.log("User uid not found");
      }
    }

    // Function to remove the user from a plan, where remove the user id from plans participants and remove plan id from user's plansJoined and plansCreated
    const removeUserFromPlan = async (planId: string) => {
      if (!user?.uid) {
        console.log("User uid not found");
        console.log('user:', user);
        return;
      }
    
      const userDoc = doc(db, "users", user.uid);
      const planDoc = doc(db, "plans", planId);
    
      try {
        // Remove the plan ID from the user's plansJoined and plansCreated arrays
        await updateDoc(userDoc, {
          plansJoined: arrayRemove(planId),
          plansCreated: arrayRemove(planId)
        });
    
        // Remove the user ID from the plan's participants array
        await updateDoc(planDoc, {
          participants: arrayRemove(user.uid)
        });
    
        console.log(`User ${user.uid} removed from plan ${planId}`);
      } catch (error) {
        console.error("Error removing user from plan: ", error);
      }
    };

    const addUserToPlan = async (planId: string) => {
      if (!user?.uid) {
        console.log("User uid not found");
        return;
      }
    
      const userDoc = doc(db, "users", user.uid);
      const planDoc = doc(db, "plans", planId);
    
      try {
        // Add the plan ID to the user's plansJoined array
        await updateDoc(userDoc, {
          plansJoined: arrayUnion(planId)
        });
    
        // Add the user ID to the plan's participants array
        await updateDoc(planDoc, {
          participants: arrayUnion(user.uid)
        });
    
        console.log(`User ${user.uid} added to plan ${planId}`);
      } catch (error) {
        console.error("Error adding user to plan: ", error);
      }
    };


    // Wrap the children with the context provider
    return (
        <AuthContext.Provider value={{ user, signUp, logIn, googleSignIn, logOut, SignUpWithGoogle, addHostel, fetchPlansForHostel, refreshHostels, deleteHostel, addNewPlan, getHostelData, getPlanData, getOtherUserData, changeUserName, removeUserFromPlan, addUserToPlan }}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};