import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/DB";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";
const bcrypt = require("bcryptjs");

type User = {
  name: string;
  email: string;
  password: string;
  image?: string;
};
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password }: any = credentials;

        try {
          await connectToDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (err) {}
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/login",
  },
});

export { handler as GET, handler as POST };
