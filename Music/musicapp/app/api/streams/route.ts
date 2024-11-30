import { prismaClient } from "@/app/lib/db";
import { NextResponse } from "next/server";
import {z} from 'zod';

const createStreamSchema=z.object({
        creatorId:z.string(),
        url:z.string(),
})
export async function POST(req:NextResponse){
    try{
        const data =createStreamSchema.parse(await req.json());
        const isYt=data.url.includes("youtube");
        prismaClient.stream.create({
            userId:data.creatorId,
            url:data.url,
        })
    }catch (e){
        return NextResponse.json({
            message:"error while adding a stream"
        },{
            status:411
        })
    }
}