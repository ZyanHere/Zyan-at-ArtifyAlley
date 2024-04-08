import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            // authorizationURL: "https://accounts.google.com/o/oauth2/auth",
            // tokenURL: "https://oauth2.googleapis.com/token",
            // profileURL: "https://www.googleapis.com/oauth2/v3/userinfo",
            // profile(profile) {
            //     return {
            //         id: profile.id,
            //         name: profile.name,
            //         email: profile.emails[0].value,
            //         image: profile.photos[0].value
            //     }
            // }
        })
    ]
})

export { handler as GET, handler as POST}