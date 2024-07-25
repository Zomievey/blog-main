import { useState, useEffect, createContext, useContext } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, db } from "../utils/firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

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
      return docSnap.data().username;
    }
    return null;
  };

  const signin = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const user = userCredential.user;
        setUser(user);
        const userRole = await getUserRole(user.uid);
        setRole(userRole);
        return user;
      }
    );
  };

  const signup = (email, password, username) => {
    return createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        const user = userCredential.user;
        setUser(user);
        await setDoc(doc(db, "users", user.uid), {
          role: "user",
          username: username,
        });
        setRole("user");
        return user;
      }
    );
  };

  const signout = () => {
    return signOut(auth).then(() => {
      setUser(null);
      setRole(null);
      router.push("/login");
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, role, signin, signup, signout, getUsername }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
