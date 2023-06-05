import { useNavigate, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import io from 'socket.io-client'
import useAuth from "../context/useAuth"


const local = io('http://localhost:4000')
const maquina1 = io('http://localhost:4001')
const maquina2 = io('http://localhost:4002')

export function PostForm() {

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const { user } = useAuth()
  const { id } = useParams()
  const history = useNavigate()
  const [postResponse, setPostResponse] = useState({ success: null, message: '' });


  const handleSubmit = (e) => {
    e.preventDefault()
    local.emit('setPost', {
      title: title,
      description: message,
      user: user.name
    })
    maquina1.emit('setPost', {
      title: title,
      description: message,
      user: user.name
    })
    maquina2.emit('setPost', {
      title: title,
      description: message,
      user: user.name
    })
  }
  const handleSubmitUpdate = (e) => {
    e.preventDefault()
    local.emit('updatePost', {
      id: { _id: (id) },
      body: {
        title: title,
        description: message
      }
    })
    maquina1.emit('updatePost', {
      id: { _id: (id) },
      body: {
        title: title,
        description: message
      }
    })
    maquina2.emit('updatePost', {
      id: { _id: (id) },
      body: {
        title: title,
        description: message
      }
    })
  }

  local.on('postData', (data) => {
    if (data.success) {
      setMessage(data.post.description)
      setTitle(data.post.title)
    }
  });
  local.on('commentsData', (data) => {
    // if (data.success) {
    //   setMessage(data.post.description)
    //   setTitle(data.post.title)
    // }
    console.log(data)
  });
  useEffect(() => {
    local.on('postSaved', (data) => {
      setPostResponse(data)
      if (data.success) {
        history('/posts')
      }
    });
    if (id) {
      local.emit('getPost', id)
    }
    return () => {
      local.off('postSaved');
    };
  }, []);

  if (id) {
    return (
      <div className="flex items-center justify-center" >
        <div className="bg-zinc-800 p-10 shadow-md shadow-black">

          <header className="flex items-center py-4 px-4 text-white justify-between">
            <h3 className="text-xl">Editar Publicacion</h3>
            <Link to='/posts' className="text-gray-400 text-sm hover:text-gray-300"> Regresar</Link>
          </header>

          <form onSubmit={handleSubmitUpdate}>
            <label htmlFor="">Title</label>
            <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
            <label htmlFor="">Post</label>
            <input type="text" onChange={e => setMessage(e.target.value)} value={message} />
            <button>Send</button>
            {postResponse.success === false && <p>{postResponse.message}</p>}
          </form>
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center" >
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">

        <header className="flex items-center py-4 px-4 text-white justify-between">
          <h3 className="text-xl">Nueva Publicacion</h3>
          <Link to='/' className="text-gray-400 text-sm hover:text-gray-300"> Regresar</Link>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="">Title</label>
          <input type="text" onChange={e => setTitle(e.target.value)} />
          <label htmlFor="">Post</label>
          <input type="text" onChange={e => setMessage(e.target.value)} />
          <button>Send</button>
          {postResponse.success === false && <p>{postResponse.message}</p>}
        </form>
      </div>
    </div>
  )
}