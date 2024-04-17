import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function retrieveMember(id) {
  return await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });
}

export async function registerMember(data) {
  return await prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin || false,
    },
  });
}

export async function updateMember(id, data) {
  return await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      isAdmin: data.isAdmin,
    },
  });
}

export async function deleteMember(id) {
  return await prisma.user.delete({
    where: { id: parseInt(id) },
  });
}
