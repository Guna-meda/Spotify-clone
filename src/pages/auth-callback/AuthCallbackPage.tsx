import { axiosInstance } from "@/lib/axios";
import { useUser } from "@clerk/clerk-react";
import { Loader } from "lucide-react";
import { useEffect, useRef } from "react";
import {useNavigate } from "react-router-dom";

const AuthCallbackPage = () => {

  const {isLoaded,user} = useUser();
  const navigate = useNavigate();
  const syncAttempted = useRef(false);

  useEffect(()=> {
    const syncUser = async () => {
      try {
       syncAttempted.current=true;

        if(!isLoaded || !user || syncAttempted.current) return;
        await axiosInstance.post("/auth/callback" , {
          id:user.id,
          firstName:user.firstName,
          lastName : user.lastName,
          imageUrl:user.imageUrl
        })
      } catch (error) {
        console.log("Error in auth callback from AuthCallBackPage",error)
      } finally {
        navigate("/",)
      }
    }

    syncUser()
  },[isLoaded,user,navigate])

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg p-6">
        <div className="flex flex-col items-center gap-4">
          <Loader className="size-6 text-emerald-500 animate-spin" />
          <h3 className="text-xl font-bold text-zinc-100">Logging you in</h3>
          <p className="text-sm text-zinc-400">Redirecting...</p>
        </div>
      </div>
    </div>
  );
};

export default AuthCallbackPage;
