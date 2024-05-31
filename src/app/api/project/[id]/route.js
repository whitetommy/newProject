import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(req, { params }) {
  try {
    const { id } = params;

    const { title, isPublic } = await req.json();

    const updatedProject = await prisma.projects.update({
      where: { id: Number(id) },
      data: { title, isPublic },
    });

    return NextResponse.json(updatedProject, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.projects.delete({
      where: { id: Number(id) },
    });

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete project", details: error.message },
      { status: 500 }
    );
  }
}
