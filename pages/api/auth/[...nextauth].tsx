import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "../../../lib/prisma";
import { validateEmail } from "../../../util/authValidation";

const ERRORS = {
  invalidCredentials: "Invalid Username or Password",
  serverError: "Something went wrong. Please contact support",
};

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "credentials",
      // name: "custom-credentials",
      // @ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        try {
          if (!validateEmail(email) || !password || password.length < 8) {
            throw new Error(ERRORS.invalidCredentials);
          }
          const foundUser = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          if (
            !foundUser ||
            !(await bcrypt.compare(password, foundUser.password))
          ) {
            throw new Error(ERRORS.invalidCredentials);
          }
          const usrObj = {
            email: foundUser.email,
            firstName: foundUser.firstName,
            lastName: foundUser.lastName,
            createdAt: foundUser.createdAt,
            id: foundUser.id,
          };
          return usrObj;
        } catch (error) {
          if (error.message !== ERRORS.invalidCredentials) {
            throw new Error(ERRORS.serverError);
          }
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.name = `${user.firstName} ${user.lastName}`;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 2 * 60 * 60, // 2 hours
    // maxAge: 30 * 24 * 60 * 60, // 30 days
  },
};

export default NextAuth(authOptions);
