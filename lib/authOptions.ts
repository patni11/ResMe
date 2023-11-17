import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongoDB from "./mongodb";
import clientPromise from "./clientPromise";
import bcrypt from "bcryptjs";
import { User } from "../models/user";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import { sendWelcomeEmail } from "./actions/sendEmail.action";
export type Session = {
  user: {
    email: string;
    name?: string;
    image?: string;
  };
};

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET!,
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      name: "google",
      id: "google",
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    FacebookProvider({
      name: "facebook",
      id: "facebook",
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      name: "github",
      id: "github",
    }),
    // ...add more providers here
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        // Add logic here to look up the user from the credentials supplied
        if (credentials == null) return null;
        // login

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            const isMatch = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isMatch) {
              return user;
            } else {
              throw new Error("Email or password is incorrect");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    //newUser: "/dashboard",
  },

  callbacks: {
    // We can pass in additional information from the user document MongoDB returns
    async jwt({ token, user }: any) {
      if (user) {
        token.user = {
          _id: user._id,
          email: user.email,
          name: token.name,
        };
      }

      return token;
    },
    // If we want to access our extra user info from sessions we have to pass it the token here to get them in sync:
    session: async ({ session, token }: any) => {
      if (token) {
        session.user = token.user;
      }
      return session;
    },
  },
  events: {
    async createUser(message) {
      const params = {
        name: message.user.name,
        email: message.user.email,
      };

      await sendWelcomeEmail(params); // <-- send welcome email
    },
  },
};

export default NextAuth(authOptions);
