"use client"
import {  signIn, signOut, useSession } from "next-auth/react"
// import { Music} from 'lucide-react'
// import Link from "next/link"
import { Button } from "@/components/ui/button";
export function Appbar() {
    const session=useSession();
    return <>
            <div className="flex justify-between items-center px-16 pt-3">
                <div className="font-bold text-lg">
                Muzic
                </div>
          {session.data?.user &&  <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors m-2" onClick={() => signOut()}>Logout</Button>}
          {!session.data?.user &&  <Button className="bg-purple-600 text-white hover:bg-purple-700 transition-colors m-2" onClick={() => signIn()}>SignIn</Button>}
            </div>
        
    </>
    
}