import { prismaClient } from "@/app/lib/db";
import { NextResponse } from "next/server";
import {z} from 'zod';
//@ts-ignore
import youtubesearchapi  from "youtube-search-api";
const urlRegex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const createStreamSchema=z.object({
        creatorId:z.string(),
        url:z.string(),
})
export async function POST(req:NextResponse){
    try{
        const data =createStreamSchema.parse(await req.json());
        const isYt=data.url.match(urlRegex);
        if(!isYt){
            return NextResponse.json({
                message:"Wrong URL format"
            },{

                status:421
            })
        }
        const extractedId=data.url.split("?v=")[1];
        const res=await youtubesearchapi.GetVideoDetails(extractedId);
        console.log(res.title);
        console.log(res.thumbnail.thumbnails);
        const thumbnails=res.thumbnail.thumbnails;
        thumbnails.sort((a:{width:number},b:{width:number})=>a.width < b.wdith ? -1:1)
       const stream=await  prismaClient.stream.create({
            data:{
                userId:data.creatorId,
                url:data.url,
                extractedId,
                type:"Youtube",
                title:res.title,

            }
        });
        return NextResponse.json({
            message:"stream added",
            id:stream.id 
        })
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