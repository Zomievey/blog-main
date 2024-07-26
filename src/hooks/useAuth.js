import { useState, useEffect, createContext, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";
/* eslint-disable @next/next/no-img-element */

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userRole = await getUserRole(firebaseUser.uid);
        setUser(firebaseUser);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getUserRole = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().role;
    }
    return null;
  };

  const getUsername = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const username = docSnap.data().username;
      console.log(`Fetched username for UID ${uid}:`, username); // Debug log
      return username;
    }
    console.log(`No user document found for UID ${uid}`); // Debug log
    return null;
  };
  

  const signin = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;
    const userRole = await getUserRole(firebaseUser.uid);
    setUser(firebaseUser);
    setRole(userRole);
    return firebaseUser;
  };

  const signup = async (email, password, username) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const firebaseUser = userCredential.user;
    await setDoc(doc(db, "users", firebaseUser.uid), {
      role: "user",
      username: username,
    });
    setUser(firebaseUser);
    setRole("user");
    return firebaseUser;
  };

  const signout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
    router.push("/login");
  };

  if (loading) {
    return (
      <div>
        <div className='flex justify-center items-center'>
          <img
            src='https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExenVsbWN5czN3MmdyYzRjdndrdW4wejRuZ2c3NzlvdWo5aW13cDNicyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/yybzx6pV8N7ziQTaJ0/giphy.gif'
            alt='Loading'
          />
        </div>
        <h1 className='text-center mt-2' style={{ color: "#49a4c4" }}>
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, role, signin, signup, signout, getUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
