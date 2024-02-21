import NextAuth from "next-auth"
import { SiweCredentials } from "./providers/SiweCredentials"

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    SiweCredentials
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }: { session: any; token: any }) {
      session.address = token.sub
      session.user.name = token.sub
      return session
    },
  },
})