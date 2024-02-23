import httpInstance from '@/utils/common';
import { PUBLIC_APIS } from '@/utils/services/apiService';
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from 'next';
import { NextAuthOptions, User, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const Provider: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credential) {
        try {
          const res = await httpInstance.post(PUBLIC_APIS['login'], {
            email: credential?.email,
            password: credential?.password,
          });
          if (res?.data?.status) {
            const userData = res?.data?.data;
            const user = userData;
            return user;
          }
          return null;
        } catch (error) {
          console.log(error, 'error');
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user.accessToken = token?.accessToken as any;
      session.user = token as any;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/',
    signOut: '/',
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, Provider);
}
