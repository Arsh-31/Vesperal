"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth, loginWithGoogle } from "../lib/firebase";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/");
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: "#272030" }}
    >
      <div className="p-8 rounded-md shadow-lg text-center space-y-5 max-w-md w-full bg-[#e3ebf2]">
        <h1 className="text-3xl font-bold" style={{ color: "#272030" }}>
          Welcome to LifeAt
        </h1>

        <p className="text-sm" style={{ color: "#272030", opacity: 0.7 }}>
          Log in to start your aesthetic productivity journey.
        </p>

        <button
          onClick={handleLogin}
          className="px-6 py-3 rounded-sm font-medium shadow-sm hover:shadow-md transform hover:scale-102 transition-all duration-150"
          style={{ backgroundColor: "#272030", color: "#e3ebf2" }}
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
