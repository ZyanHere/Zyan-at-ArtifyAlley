import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "username is required"],
        unique: [true, "username already exists"]
    },
    email: {
        type: String,
        required: [true, "email is required"],
        unique: [true, "email already exists"]
    },
    password: {
        type: String,
        required: [true, "password is required"]
    },
    profileImagePath: {
        type: String,
        required: [true, "profileImagePath is required"]
    },
    wishlist: {
        type: Array,
        default: []
    },
    cart: {
        type: Array,
        default: []
    },
    order: {
        type: Array,
        default: []
    },
    work: {
        type: Array,
        default: []
    }
})

const User = models.User || model("User", UserSchema);

export default User;