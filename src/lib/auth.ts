import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { passwordCompare } from "./passwordHasher/hasher";

import { PrismaClient } from "@prisma/client";

const getGoogleCredentials = () => {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientId || clientId.length === 0) {
    throw new Error("Mising GOOGLE_CLIENT_ID");
  }
  if (!clientSecret || clientSecret.length === 0) {
    throw new Error("Mising GOOGLE_CLIENT_SECRECT_ID");
  }

  return { clientId, clientSecret };
};
const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (credentials) {
          if (!credentials.email || !credentials.password) {
            return null;
          }

          //Check email and password is valid
          console.log(credentials);
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email,
            },
          });

          if (
            user &&
            (await passwordCompare(credentials.password, user.password))
          ) {
            // return user;

            return {
              id: user.id,
              email: user.email,
              name: user.name,
              images: user.pic,
              password: user.password,
            };
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: getGoogleCredentials().clientId,
      clientSecret: getGoogleCredentials().clientSecret,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user) {
        throw new Error("Authentication failed. Please check your credentials.");
      }
      return true;
    },
    async jwt({ token, user }) {
      // const dbUser: User | null = await prisma.user.findUnique({
      //   where: {
      //     id: token.id,
      //   },
      //   select: {
      //     id: true,
      //     name: true,
      //     email: true,
      //     pic: true,
      //     createdAt: true,
      //     updatedAt: true,
      //   },
      // });

      // if (!dbUser) {
      //   token.id = user.id;
      //   return token;
      // }

      // return {
      //   id: dbUser.id,
      // };
      if (user) {
        return {
          ...token,
          id: user.id,
          image:user.image
        };
      }

      // console.log("JWT callback", { token, user });
      return token;
    },

    async session({ session, token }) {
      // if (token) {
      //   session.user.id = token.id;
      // }

      // console.log("Session callback", { token, session });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };

      
    },
    async redirect() {
      return "/";
    },
  },
};
