import Post from '../models/Post.js'
import {deleteImage, uploadImage} from '../libs/cloudinary.js'
import fs from 'fs-extra'

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
        if (!posts) {
            return res.status(404).send('Posts not found');
        }
        res.send(posts)
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

export const createPosts = async (req, res) => {
    try {
        const { title, description } = req.body
        let image;
        
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }
        }
        
        const newPost = new Post({ title, description , image})
        await newPost.save()
        return res.json(newPost)
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}


export const updatePosts = async (req, res) => {
    try {
        let image;
        
        if(req.files?.image){
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image = {
                url: result.secure_url,
                public_id: result.public_id
            }

            req.body.push(image)
        }
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })
        if (!post) {
            return res.status(404).send('Post not updated');
        }
        return res.send(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

export const deletePosts = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        if(post.image.public_id){
            await deleteImage(post.image.public_id)
        }

        return res.send('Post deleted');
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}

export const getPost = async(req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        
        if (!post) {
            return res.status(404).send('Post not found');
        }
        return res.send(post);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: error.message});
    }
}