import { usePosts } from "../context/postContext"
import { VscEmptyWindow } from 'react-icons/vsc'
import { Link } from "react-router-dom"
import { PostCard } from "../components/PostCard"


export function HomePage() {

  const { posts } = usePosts()

  if (posts.length === 0) return (

    <div className="flex flex-col justify-center items-center">
      <VscEmptyWindow className="w-48 h-48 text-white" />
      <h1 className="text-white text-2xl">
        There are no posts
      </h1>

      <div>
        <Link to="/new" className="bg-indigo-500 bg-indigo-600 text-white rounded"> Create new post</Link>
      </div>
    </div>
  )


  return (
    <div className="text-white">
      <Link to="/new" className="bg-indigo-500 bg-indigo-600 text-white rounded"> Create new post</Link>

      <div className="grid gap-3">
        {posts.map(post => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>

    </div>
  )
}