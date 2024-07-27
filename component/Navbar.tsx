"use client"
import "../app/globals.css"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Appbar from "./Appbar";


export default function Navbar() {
  const [user, setUser] = useState(false); // Set initial state to null
  const router = useRouter();

  useEffect(() => {
    async function getdata() {
      try {
        const response = await axios.get('/api/me');
        setUser(response.data.status);
      } catch (error) {
        setUser(false);
      }
    }
    getdata();
  }, []);

  const handleSignOut = async () => {
    try {
      const response = await axios.get("/api/logout");
      if (response.data.ok) {
        toast.success(response.data.msg);
        setUser(false); 
        router.push("/");
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      toast.error("Unable to logout");
    }
  };

  const handleSignIn = () => {
    router.push('/login');
  };

  if (user === null) {
    return null; // Render nothing or a loading spinner while fetching the user status
  }

  return <Appbar onSignin={handleSignIn} onSignout={handleSignOut} user={user} />;
}
