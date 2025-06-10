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

  // const theme = useTheme();
  const handleLogin = async () => {
    await loginWithGoogle();
    // router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pink-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-zinc-800 p-8 rounded-2xl shadow-xl text-center space-y-6 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Welcome to LifeAt
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Log in to start your aesthetic productivity journey.
        </p>
        <button
          onClick={handleLogin}
          className="px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-semibold transition"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}
