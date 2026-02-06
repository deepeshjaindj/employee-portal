import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { upsertEmployeeFromAuth } from '@/lib/services/employees';

const allowedDomains = ['onesolve.io', 'onesolve.in'];

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
        },
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      if (!email) return false;

      const domain = email.split('@')[1]?.toLowerCase();
      if (!domain || !allowedDomains.includes(domain)) {
        return false;
      }

      return true;
    },
    async jwt({ token, user, account }) {
      // user is only present on the initial sign-in
      // On subsequent requests, check if we already have employeeId in token
      if (user && user.email) {
        try {
          console.log('[Auth] Syncing employee to Airtable for:', user.email);
          const employee = await upsertEmployeeFromAuth({
            email: user.email,
            name: user.name,
          });
          (token as any).employeeId = employee.id;
          console.log('[Auth] Successfully synced employee:', employee.id);
        } catch (error) {
          console.error('[Auth] Failed to sync employee during JWT callback:', error);
          // Don't throw - allow login to proceed even if Airtable sync fails
          // But log it clearly for debugging
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).employeeId = (token as any).employeeId;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
});

export { handler as GET, handler as POST };

