"use client";

import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { auth, loginWithGoogle } from "../lib/firebase";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) router.push("/");
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await loginWithGoogle();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#272030] to-[#3a2f4a]">
      <div className="p-10 rounded-2xl shadow-xl text-center space-y-6 max-w-md w-full bg-[#e3ebf2]/90 backdrop-blur-lg">
        <h1 className="text-4xl font-extrabold text-[#272030]">
          Welcome to <span className="text-[#4E4C67]">Vesperal</span>
        </h1>

        <p className="text-base text-[#272030]/70">
          Sign in to begin your aesthetic productivity journey
        </p>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 w-full
                     bg-[#272030] text-[#e3ebf2] shadow-md 
                     hover:shadow-lg hover:scale-105 active:scale-95 
                     transition-transform duration-200"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in with Google"
          )}
        </button>
      </div>
    </div>
  );
}
