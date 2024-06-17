import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDB } from "@/lib/DB";
import User from "@/models/User";
import bcrypt from "bcryptjs-react";

type User = {
  email: string;
  password: string;
  image?: string;
};

export const authOption = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password, image }: any = credentials;

        try {
          await connectToDB();
          const user = await User.findOne({ email });
          if (!user) {
            return null;
          }
          const passwordMatch =
            password && user.password
              ? await bcrypt.compare(password, user.password)
              : false;
          if (!passwordMatch) {
            return null;
          }
          return user;
        } catch (err) {
          console.log(err);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  pages: {
    signIn: "/",
  },
};
const handler = NextAuth(authOption as any);
export { handler as GET, handler as POST };
