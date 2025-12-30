import { prismaClient } from "@/app/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { z } from "zod";

const UpvoteSchema=z.object({
    streamId:z.string(),
})

export async function POST(req:NextResponse){
    const session=await getServerSession();
   
    const user=await prismaClient.user.findFirst({
        where:{
            email:session?.user?.email  ?? ""
        }
    })
    if(!user){
        return NextResponse.json({
            message:"unauthenticated"
        },{
            status:403
        })
    }
    try{
        const data=UpvoteSchema.parse(await req.json())
        const res=await prismaClient.upvote.create({
            data:{
                    userId:user.id,
                    streamId:data.streamId
                
            }
        })
        if(res){
            return NextResponse.json({
                message:'Upvoted successfully'
            })
        }
    }catch(e){
        // console.log(e);
        return NextResponse.json({
            message:"Error while upvoting "
        },{
            status:403
        })
    }

}