import { useState, createContext, useContext, useEffect } from "react"
import { createPostsRequests, deletePostsRequests, getPostRequests, getPostsRequests, updatePostRequests } from "../api/posts"

export const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext)
    return context
}

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([])

    const getPosts = async () => {
        const res = await getPostsRequests()
        setPosts(res.data)
    }
    const getPost = async (id) => {
        const res = await getPostRequests(id)
        return res.data
    }
    const createPost = async (post) => {
        const res = await createPostsRequests(post)
        setPosts([...posts,res.data])
    }
    const updatePost = async (id,post) => {
        const res = await updatePostRequests(id,post)
        if (res.status === 200 ){
            setPosts(posts.map(post => post._id === id ? res.data : post))
        }
    }

    const deletePost = async(id) => {
        const res = await deletePostsRequests(id)
        if (res.status === 200 ){
            setPosts(posts.filter(post => post._id !== id))
        }
    }
    useEffect(() => {
        getPosts()
    }, [])


    return <postContext.Provider value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost
    }}>
        {children}
    </postContext.Provider>
}