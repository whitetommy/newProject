import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const login = async (credentials) => {
  const prisma = new PrismaClient({});

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: credentials.email,
      },
    });
    if (!user) {
      throw new Error("Wrong credentials!");
    }

    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      return user;
    } else {
      throw new Error("Wrong credentials!");
    }
  } catch (err) {
    throw new Error("Failed to login!");
  }
};

const generateAccessToken = (user) => {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log("async authorize(credentials)");
        try {
          const user = await login(credentials);
          user.accessToken = generateAccessToken(user);
          console.log("user_credentials");
          return user;
        } catch (err) {
          console.log("error_credentials");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("aasync signIn({ user, account, profile })");
      console.log(user);
      console.log(account);
      console.log(profile);
      return true;
    },
    ...authConfig.callbacks,
  },
});
