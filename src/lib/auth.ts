import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthOptions } from 'next-auth';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      async authorize(credentials) {
        if (credentials?.username === 'admin' && credentials?.password === 'password') {
          return { id: '1', name: 'Admin' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
};
