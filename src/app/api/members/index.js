import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function membersCheck(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const session = await getSession({ req });
  if (!session || !session.user.isAdmin) {
    return res.status(403).json({ message: "Forbidden" });
  }

  try {
    // admin is only gonna check user information
    const members = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
