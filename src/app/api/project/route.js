import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const projects = await prisma.projects.findMany({
      where: {
        authorId: req.authorId,
      },
    });
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
    const { title, path, framework, visibility, authorId } = await req.json();
    const newProject = await prisma.projects.create({
      data: {
        title,
        path,
        framework,
        isPublic: visibility === "public",
        authorId,
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
