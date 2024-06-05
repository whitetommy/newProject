import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader) {
      return NextResponse.json({ error: "인증되지 않음" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    const projects = await prisma.projects.findMany({
      where: {
        authorId: decodedToken.id,
      },
    });

    revalidatePath("/mypage");
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const authorizationHeader = req.headers.get("Authorization");
    if (!authorizationHeader) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decodedToken);

    const { title, path, framework, isPublic } = await req.json();

    const newProject = await prisma.projects.create({
      data: {
        title,
        path,
        framework,
        isPublic: Boolean(isPublic),
        authorId: parseInt(decodedToken.id),
      },
    });
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
