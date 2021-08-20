import NextAuth from "next-auth"
import Providers from "next-auth/providers"
const yo = process.env.GOOGLE_CLIENT_ID
console.log(yo)
const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
}
export default (req, res) => NextAuth(req, res, options)
