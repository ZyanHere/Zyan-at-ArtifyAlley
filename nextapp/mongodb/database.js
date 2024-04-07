import mongoose from "mongoose";

let isConnected = false;

export const connectDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("database connection established");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ArtifyAlley",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log("database connection established");
        
    } catch (err) {
        console.log(err.message);
    }
}