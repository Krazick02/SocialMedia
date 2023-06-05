import { VscEmptyWindow } from 'react-icons/vsc'
import { Link, useNavigate, useLocation, useParams } from "react-router-dom"
import { PostCard } from "../components/PostCard"
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
import useAuth from '../context/useAuth'
import { CommentCard } from '../components/CommentCard'

const local = io('http://localhost:4000')
const maquina1 = io('http://localhost:4001')
const maquina2 = io('http://localhost:4002')

export function PostWComments() {
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);
  const [description, setDescription] = useState('')
  const [descriptionC, setDescriptionC] = useState('')
  const { id } = useParams()
  const {user} = useAuth()
  
  local.on('postData', (data) => {
    if (data.success) {
      setPost(data.post)
      setDescriptionC(data.post.description.replaceAll(' ','_'))
    }
  });
  local.on('commentsData', (data) => {
    setComments(data)
  });

  local.emit('getComments', descriptionC)

  const handleSubmit = (e) => {
    e.preventDefault()
    local.emit('setComment', {
      post: post.description.replaceAll(' ','_'),
      description: description,
      user: user.name,
    })
    maquina1.emit('setComment', {
      post: post.description.replaceAll(' ','_'),
      description: description,
      user: user.name,
    })
    maquina2.emit('setComment', {
      post: post.description.replaceAll(' ','_'),
      description: description,
      user: user.name,
    })
    setDescription('')
  }

  useEffect(() => {
    if (id) {
      local.emit('getPost', id)
    }
    console.log(description)
    return () => {
      local.off('postSaved');
    };
  }, []);
  return (

    <div className="text-white">
      <div className="grid gap-3">
        <PostCard post={post} key={post._id} />
      </div>
      {comments.map(comment => (
          <CommentCard comment={comment} key={comment._id} />
        ))}
      <div className="flex items-center justify-center" >
        <div className="bg-zinc-800 p-10 shadow-md shadow-black">

          <header className="flex items-center py-4 px-4 text-white justify-between">
            <h3 className="text-xl">Editar Publicacion</h3>
            <Link to='/posts' className="text-gray-400 text-sm hover:text-gray-300"> Regresar</Link>
          </header>

          <form onSubmit={handleSubmit} className="text-black" >
            <label htmlFor="">Comment</label>
            <input type="text" onChange={e => setDescription(e.target.value)} value={description}/>
            <button>Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
