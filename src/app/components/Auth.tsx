"use client";

import { useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";

export const Auth = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

  const signOutUser = async () => {
    await signOut(auth);
  };

  if (user)
    return (
      <div>
        <p>Welcome, {user.displayName}</p>
        <button onClick={signOutUser} className="btn">
          Sign Out
        </button>
      </div>
    );

  return (
    <button onClick={signIn} className="btn">
      Sign in with Google
    </button>
  );
};
