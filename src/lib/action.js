"use server";

import { revalidatePath } from "next/cache";
import { signIn, signOut } from "./auth";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export const addUser = async (prevState, formData) => {
  const { name, email, password, isAdmin } = Object.fromEntries(formData);

  try {
    const prisma = new PrismaClient({});
    const isAdminBool = isAdmin === "true";
    await prisma.user.create({
      data: {
        name,
        email,
        password: await bcrypt.hash(password, 10),
        isAdmin: isAdminBool,
      },
    });

    console.log("saved to db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const deleteUser = async (formData) => {
  const { email } = Object.fromEntries(formData);

  try {
    const prisma = new PrismaClient({});

    await prisma.user.delete({
      where: {
        email: email,
      },
    });

    console.log("deleted from db");
    revalidatePath("/admin");
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const register = async (previousState, formData) => {
  const prisma = new PrismaClient({});

  const { name, email, password, passwordRepeat } =
    Object.fromEntries(formData);

  if (password !== passwordRepeat) {
    return { error: "Passwords do not match" };
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (user) {
      return { error: "Email already exists" };
    }

    await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: await bcrypt.hash(password, 10),
      },
    });

    return { success: true };
  } catch (err) {
    console.log(err);
    return { error: "Something went wrong!" };
  }
};

export const login = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { email, password });
  } catch (err) {
    if (err.message.includes("credentials")) {
      return { error: "Invalid username or password" };
    }
    throw err;
  }
};
