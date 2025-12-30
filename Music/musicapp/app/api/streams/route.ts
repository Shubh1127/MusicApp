import { prismaClient } from "@/app/lib/db";
import { NextResponse } from "next/server";
import {z} from 'zod';
//@ts-ignore
import youtubesearchapi  from "youtube-search-api";
import { getServerSession } from "next-auth";
const urlRegex = /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:m\.)?(?:youtu(?:be)?\.com\/(?:v\/|embed\/|watch(?:\/|\?v=))|youtu\.be\/)((?:\w|-){11})(?:\S+)?$/;

const createStreamSchema=z.object({
        creatorId:z.string(),
        url:z.string(),
})
export async function POST(req:NextResponse){
    const session=await getServerSession();
    // console.log(session);
    const user=await prismaClient.user.findFirst({
        where:{
            email:session?.user?.email ?? ""
        }
    })
    if(!user){
        return NextResponse.json({
            message:'Unauthenticated',
            status:403
        })
    }
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
        const check=await prismaClient.stream.findFirst({
            where:{
                extractedId:extractedId ?? ""
            }
        })
        if(check){
            return NextResponse.json({
                message:"Stream already exists"
            })
        }

        const res=await youtubesearchapi.GetVideoDetails(extractedId);
        console.log(res);
        const thumbnails=res.thumbnail.thumbnails;
        thumbnails.sort((a:{width:number},b:{width:number})=>a.width < b.width ? -1:1)
         const stream=await  prismaClient.stream.create({
            data:{
                userId:data.creatorId,
                url:data.url,
                extractedId,
                type:"Youtube",
                title:res.title ?? "can't find Video", 
                smallImg:(thumbnails.length > 1 ? thumbnails[thumbnails.length-2].url : thumbnails[thumbnails.length-1].url) ?? "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg",
                bigImg:thumbnails[thumbnails.length-1].url ?? "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg"
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
                userId:creatorId ?? ""
        }
    })
    return NextResponse.json({
        streams
    })

}