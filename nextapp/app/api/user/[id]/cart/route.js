import { connectDB } from "@mongodb/database";
import User from "@models/User";

export const POST = async (req, { params }) => {
    try {
        const { cart } = await req.json();
        await connectDB();
        const userId = params.id
        const user = await User.findById(userId);

        user.cart = cart;
        await user.save();
        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        console.log(error)
        return new Response("Failed to update card", { status: 500 })
    }
}