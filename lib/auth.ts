import type { NextAuthOptions, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// Extend NextAuth default types to include custom accessibility preferences
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: 'STUDENT' | 'TEACHER' | 'ADMIN';
      highContrast: boolean;
      preferredTtsSpeed: number;
      isVoiceActive: boolean;
    } & DefaultSession['user'];
    accessToken?: string;
    refreshToken?: string;
  }

  interface User {
    id: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
    highContrast: boolean;
    preferredTtsSpeed: number;
    isVoiceActive: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: 'STUDENT' | 'TEACHER' | 'ADMIN';
    highContrast: boolean;
    preferredTtsSpeed: number;
    isVoiceActive: boolean;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number;
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile https://www.googleapis.com/auth/calendar",
          access_type: "offline",
          prompt: "consent",
        },
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'student@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password');
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error('User not found or password incorrect');
        }

        const passwordMatch = await bcrypt.compare(credentials.password, user.password);

        if (!passwordMatch) {
          throw new Error('Incorrect password');
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          highContrast: user.highContrast,
          preferredTtsSpeed: user.preferredTtsSpeed,
          isVoiceActive: user.isVoiceActive,
        };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Find or Create User in Prisma
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email! },
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email!,
              name: user.name || "İsimsiz Kullanıcı",
              role: "STUDENT", 
              highContrast: false,
              preferredTtsSpeed: 1.0,
              isVoiceActive: true,
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user, account, trigger, session }) {
      // Basic login
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.highContrast = user.highContrast;
        token.preferredTtsSpeed = user.preferredTtsSpeed;
        token.isVoiceActive = user.isVoiceActive;
      }

      // Initial Google Auth: Capture Access Token
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = (account.expires_at || 0) * 1000;
      }
      
      // Allow session updates (e.g. toggling high contrast or TTS)
      if (trigger === 'update' && session) {
        return { ...token, ...session };
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role as any;
        session.user.highContrast = token.highContrast;
        session.user.preferredTtsSpeed = token.preferredTtsSpeed;
        session.user.isVoiceActive = token.isVoiceActive;
        session.accessToken = token.accessToken as string;
        session.refreshToken = token.refreshToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
