// import { Post } from "@/lib/models";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({});

export const GET = async (request) => {
  try {
    
    const posts = await prisma.projects.findMany({
      where:{
        isPublic: true,
      }
    });
    return NextResponse.json(posts);
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
