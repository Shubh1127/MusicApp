"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react"

export  function Redirect(){
    const Session =useSession();
    const router=useRouter()
    useEffect(()=>{
        if(Session?.data?.user){
            router.push('/dashboard')
        }
    },[Session])

    return null
}