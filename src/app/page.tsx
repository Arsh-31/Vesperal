"use client";

import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";
import { useEffect, useState } from "react";
import { auth } from "./lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Nav } from "./components/Nav";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.push("/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return (
      <div className="w-full flex justify-center items-center h-screen">
        <p>You are not logged in. Redirecting to login...</p>
      </div>
    );
  }

  return (
    // <div className="">
    //   <Nav />
    //   <div className="flex md:flex-row h-full w-full overflow-hidden font-inter">
    //     <Sidebar />
    //     <Main />
    //   </div>
    // </div>
    <div className="flex flex-col h-screen font-inter">
      <Nav />

      <div className="flex flex-1 overflow-hidden md:flex-row">
        <Sidebar />
        <Main />
      </div>
    </div>
  );
}
