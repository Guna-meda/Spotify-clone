import React, { useEffect, useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import { axiosInstance } from '@/lib/axios'
import { Loader } from 'lucide-react'
import { useAuthStore } from '@/store/useAuthStore'
import { useChatStore } from '@/store/useChatStore'

const updateApiToken = (token: string | null) => {
  if (token)
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  else
    delete axiosInstance.defaults.headers.common['Authorization']
}

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { getToken , userId } = useAuth()
  const [loading, setLoading] = useState(true)

  const checkAdminStatus = useAuthStore((state) => state.checkAdminStatus)

  const { initSocket ,disconnectSocket } = useChatStore();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken()
        updateApiToken(token)
        if(token) {
          checkAdminStatus()
          // init socket
          if(userId) initSocket(userId)
        }
      } catch (error: any) {
        updateApiToken(null)
        console.error('Error in AuthProvider:', error)
      } finally {
        setLoading(false)
      }
    }

    initAuth();

    //clean up

    return() => disconnectSocket();

  }, [getToken , userId , checkAdminStatus , initSocket , disconnectSocket])

  if (loading) {
  return (
    <div className="h-screen w-full bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader className="size-10 text-emerald-400 animate-spin drop-shadow-[0_0_6px_#34d399]" />
        <p className="text-emerald-300 text-sm font-medium tracking-wide animate-pulse">
          Hold tight... getting things ready
        </p>
      </div>
    </div>
  )
}


  return <>{children}</>
}

export default AuthProvider
