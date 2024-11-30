"use client"
import {  signIn, signOut, useSession } from "next-auth/react"
export function Appbar() {
    const session=useSession();
    return (
            <div className="flex justify-between w-full p-3 items-center">
                <div>
                    VibeNest
                </div>
                <div>
                    {session.data?.user &&  <button className="m-2 p-2 bg-blue-600 rounded text-white" onClick={() => signOut()}>Logout</button>}
                    {!session.data?.user &&  <button className="m-2 p-2 bg-blue-600 rounded text-white" onClick={() => signIn()}>SignIn</button>}
                </div>
            </div>
    )
}