import { connectDB } from "@mongodb/database";
import User from "@models/User";
import { NextResponse } from 'next/server'
import { hash } from "bcryptjs";
import {writeFile} from "fs/promises"

export async function POST(req) {
    try {
        await connectDB();

        const data = await req.formData();

        /* Take information from the form */
        const username = data.get('username')
        const email = data.get('email')
        const password = data.get('password')
        const file = data.get('profileImage')

        if (!file) {
            return NextResponse.json(
                { message: "no file uploaded" },
                { status: 400 }
            )
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes)

        const profileImagePath = `C:/Users/subhr/OneDrive/Desktop/ArtMarket/nextapp/public/uploads/$(file.name)`
        await writeFile(profileImagePath, buffer)

        console.log(`open ${profileImagePath} to see the uploaded files`)

        //check if user exist
        const user = await User.findOne({ email })
        if (user) {
            return NextResponse.json(
                { message: "user already exist" },
                { status: 409 }
            )
        }

        //hash password
        const saltRounds = 10
        const hashedPassword = await hash(password, saltRounds)

        //create user
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            profileImagePath: `/uploads/${file.name}`
        })

        //save new user
        await newUser.save()

        return NextResponse.json({
             message: "User registerred successfully!", 
             user: newUser }, 
             { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}