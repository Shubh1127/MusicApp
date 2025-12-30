import { prismaClient } from "@/app/lib/db";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
const handler = NextAuth({
    providers: [
        GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID ?? "",
          clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        })
      ],
      secret:process.env.NEXTAUTH_SECRET ?? 'secret',
      callbacks: {
        async signIn(params) {
          if (!params.user.email) {
            return false;
          }
      
          try {
            const existingUser = await prismaClient.user.findUnique({
              where: { email: params.user.email },
            });
      
            if (!existingUser) {
              await prismaClient.user.create({
                data: {
                  email: params.user.email,
                  provider: "Google",
                },
              });
            }
          } catch (e) {
            console.error("Error during sign-in:", e);
          }
      
          return true;
        },
        async jwt({ token, user }) {
          if (user) {
            token.email = user.email;
          }
          return token;
        },
        async session({ session, token }) {
          if (session.user) {
            session.user.email = token.email as string;
          }
          return session;
        }
      }
})

export { handler as GET, handler as POST }