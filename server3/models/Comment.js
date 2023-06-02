const commentSchema = new mongoose.Schema({
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
    post: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Post', 
        required: true 
    },
})

export default mongoose.model('Comment',commentSchema)