import { useState, createContext, useContext, useEffect } from "react"
import { deletePostsRequests,updatePostRequests} from "../api/posts"

export const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext)
    return context
}

export const PostProvider = ({ children }) => {

    const [posts, setPosts] = useState([])

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

    return <postContext.Provider value={{
        posts,
        deletePost,
        updatePost
    }}>
        {children}
    </postContext.Provider>
}