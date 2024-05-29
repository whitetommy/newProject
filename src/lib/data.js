import { unstable_noStore as noStore } from "next/cache";
import { PrismaClient } from "@prisma/client";

export const getPosts = async () => {
  const prisma = new PrismaClient({});
  try {
    const posts = await prisma.projects.findMany();
    return posts;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch posts!");
  }
};
export const getUser = async (email) => {
  const prisma = new PrismaClient({});
  noStore();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch user!");
  }
};

export const getUsers = async () => {
  const prisma = new PrismaClient({});
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to fetch users!");
  }
};
