import Credentials from "next-auth/providers/credentials"
import { cookies } from "next/headers"
import { NextResponse } from "next/server";
import { SiweMessage } from "siwe"

async function getCsrfToken () {

  const jar = cookies();

  const [csrfToken] = jar.get('authjs.csrf-token')?.value.split("|") || [undefined]
  return csrfToken
}

export const SiweCredentials = Credentials({
  name: "Web3",
  credentials: {
    message: {
      type: "string"
    },
    signature: {
      type: "string"
    }
  },
  async authorize(credentials) {
    try {
      const siwe = new SiweMessage(JSON.parse(String(credentials?.message) || "{}"))
      const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!)

      const result = await siwe.verify({
        signature: String(credentials?.signature) || "",
        domain: nextAuthUrl.host,
        nonce: await getCsrfToken(),
      })

      if (result.success) {
        return {
          id: siwe.address,
        }
      }
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  },
})