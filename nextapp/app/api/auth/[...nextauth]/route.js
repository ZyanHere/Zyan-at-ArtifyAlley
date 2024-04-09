import User from "@models/User"
import { connectDB } from "@mongodb/database"
import NextAuth from "next-auth"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({email: session.user.email})
            session.user.id = sessionUser._id.toString()
            return session
        },

        async signIn({ account, profile}) {
            if(account.provider === "google"){
                try {
                    await connectDB()

                    //check if the user exists in the database
                    const user = await User.findOne({ email: profile.email })

                    if(!user) {
                        //create a new user
                        user = await User.create({
                            username: profile.name,
                            email: profile.email,
                            profileImagePath: profile.image,
                            wishlist: [],
                            cart: [],
                            order: [],
                            work: []
                        })
                    }

                    return user
                } catch (error) {
                    console.error(error)
                }
            }
        }
    }
})

export { handler as GET, handler as POST}