import { connectDB } from "@mongodb/database";
import Work from "@models/Work";
import { writeFile } from "fs/promises"

export async function POST(req) {
    try {
        await connectDB();

        const data = await req.formData();

        //extract info from data
        const creator = data.get("creator");
        const category = data.get("category")
        const title = data.get("title")
        const description = data.get("description")
        const price = data.get("price")

        //get an array of uploadeed photos
        const photos = data.getAll("workPhotoPaths")

        const workPhotoPaths = [];

        //process and store each photo
        for (const photo of photos) {
            //read the photo as an arraybuffer
            const photoBuffer = await photo.arrayBuffer();
            //convert the arraybuffer to a buffer
            const photoBufferAsBuffer = Buffer.from(photoBuffer);
            //store the photo in the uploads folder
            const photoPath = `C:/Users/subhr/OneDrive/Desktop/ArtMarket/nextapp/public/uploads/$(photo.name)`

            //write the buffer to the files system
            await writeFile(photoPath, photoBufferAsBuffer)

            //store the file path in the array
            workPhotoPaths.push(`/uploads/${photo.name}`)
        }

        //create a new work
        const newWork = new Work({
            creator,
            category,
            title,
            description,
            price,
            workPhotoPaths
        })

        await newWork.save()

        return new Response(
            JSON.stringify(newWork), {
            status: 200
        }
        )

    } catch (err) {
        console.log(err)
        return new Response("Failed to create a new Work", { status: 500 })
    }
}