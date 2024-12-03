import { prismaClient } from "@/app/lib/db";
import { NextResponse } from "next/server";
import {z} from 'zod';
const YT_REGEX=new RegExp("https:\/\/www\.youtube\.com\/watch\?v=([^&]+)")

const createStreamSchema=z.object({
        creatorId:z.string(),
        url:z.string(),
})
export async function POST(req:NextResponse){
    try{
        const data =createStreamSchema.parse(await req.json());
        const isYt=YT_REGEX.test(data.url);
        if(!isYt){
            return NextResponse.json({
                message:"Wrong URL format"
            },{

                status:421
            })
        }
        const extractedId=data.url.split("?v=")[1];
       await  prismaClient.stream.create({
            data:{
                userId:data.creatorId,
                url:data.url,
                extractedId,
                type:"Youtube"
            }
        });
    }catch (e){
        return NextResponse.json({
            message:"error while adding a stream"
        },{
            status:411
        })
    }
}
export async function GET(req:NextResponse){
    const creatorId=req.nextUrl.searchParams.get("creatorId");
    const streams=await prismaClient.stream.findMany({
        where:{
                usrId:creatorId ?? ""
        }
    })
    return NextResponse.json({
        streams
    })

}