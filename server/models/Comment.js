import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    user: { 
        // type: mongoose.Schema.Types.ObjectId, 
        // ref: 'User', 
        // required: true 
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    post: { 
        // type: mongoose.Schema.Types.ObjectId, 
        // ref: 'Post', 
        // required: true 
        type: String,
        required: true,
        trim: true
    },
})

export default mongoose.model('Comment',commentSchema)