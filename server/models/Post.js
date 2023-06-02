import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    user: { 
        // type: mongoose.Schema.Types.ObjectId, 
        // ref: 'User', 
        // required: true 
        type: String,
        required: true,
        trim: true
    },
})

export default mongoose.model('Post',postSchema)