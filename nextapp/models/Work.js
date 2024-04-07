import { Schema, model, models } from "mongoose";

const WorkSchema = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    catagory: {
        type: String,
    },
    price: {
        type: Number,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    workPhotoPath: [{type: String,}]
});

const Work = models.Work || model("Work", WorkSchema);

export default Work;