import { VscEmptyWindow } from 'react-icons/vsc'
import { Link , useNavigate, useLocation,useParams} from "react-router-dom"
import { PostCard } from "../components/PostCard"
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')
// const socket = io('http://localhost:400')

export function PostWComments() {
  const [post, setPost] = useState([]);
  // const [comments, setComments] = useState([]);
  socket.emit('getPost')
  socket.on('postData', (data) => {
    setPost(data.post);
    // setComments(data.comments);
  });

  return (

    <div className="text-white">
      {/* <Link to="/new" className="bg-indigo-500 bg-indigo-600 text-white rounded"> Create new post</Link> */}
      <div className="grid gap-3">
          <PostCard post={post} key={post._id} />
      </div>
    </div>
  );
}
