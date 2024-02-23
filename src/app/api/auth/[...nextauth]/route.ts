import { Provider } from '@/Security/Provider';
import NextAuth from 'next-auth';

const handler = NextAuth(Provider);

export { handler as GET, handler as POST };
