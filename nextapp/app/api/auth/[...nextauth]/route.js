import User from "@models/User"
import { connectDB } from "@mongodb/database"
import { compare } from "bcryptjs";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

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
        }),
        CredentialsProvider({
            name: "Credentials",
            async authorize(credentials, req) {
                if (!credentials.email || !credentials.password) {
                    throw new Error("Invalid Email or Password");
                }

                await connectDB();

                /* Check if the user exists */
                const user = await User.findOne({ email: credentials.email });

                if (!user) {
                    throw new Error("Invalid Email or Password");
                }

                /* Compare password */
                const isMatch = await compare(credentials.password, user.password);

                if (!isMatch) {
                    throw new Error("Invalid Email or Password");
                }

                return user;
            },
        }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    callbacks: {
        async session({ session }) {
            const sessionUser = await User.findOne({ email: session.user.email })
            session.user.id = sessionUser._id.toString()

            session.user = { ...session.user, ...sessionUser._doc}

            return session
        },

        async signIn({ account, profile }) {
            if (account.provider === "google") {
                try {
                    await connectDB()

                    //check if the user exists in the database
                    let user = await User.findOne({ email: profile.email })

                    if (!user) {
                        //create a new user
                        user = await User.create({
                            username: profile.name,
                            email: profile.email,
                            profileImagePath: profile.picture,
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
            return true;
        }
    }
})

export { handler as GET, handler as POST }