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

          <div className="p-5 m-5">
            <form onSubmit={handleSubmitUpdate}>
              <div className="p-2 m-3">
                <label htmlFor="" className="text-white p-4">Title</label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
              </div>
              <div className="p-2 m-3">
                <label htmlFor="" className="text-white p-4">Post</label>
                <input onChange={e => setMessage(e.target.value)} value={message} />
              </div>
              <div className="p-2 m-3 justify-center flex">
                <button className="bg-blue-700 hover:bg-blue-500 rounded p-1">Send</button>
                {postResponse.success === false && <p>{postResponse.message}</p>}

              </div>
            </form>
          </div>
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

        <div className="p-5 m-5">
          <form onSubmit={handleSubmit}>
            <div className="p-2 m-3">
              <label htmlFor="" className="text-white p-4">Title</label>
              <input type="text" onChange={e => setTitle(e.target.value)} value={title} />
            </div>
            <div className="p-2 m-3">
              <label htmlFor="" className="text-white p-4">Post</label>
              <input onChange={e => setMessage(e.target.value)} value={message} />
            </div>
            <div className="p-2 m-3 justify-center flex">
              <button className="bg-blue-700 hover:bg-blue-500 rounded p-1">Send</button>
              {postResponse.success === false && <p>{postResponse.message}</p>}

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}