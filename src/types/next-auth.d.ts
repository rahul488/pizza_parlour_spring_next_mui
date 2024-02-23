import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      role: [{ authority: string }];
      email: string;
      accessToken: string;
    };
  }
}
