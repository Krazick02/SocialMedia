import { useNavigate, useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import io from 'socket.io-client'
import useAuth from "../context/useAuth"


const socket = io('http://localhost:4000')

export function PostForm() {

  const [message, setMessage] = useState('');
  const [title, setTitle] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);
  const {user} = useAuth()

  let redir = () => {
    window.location.href = `/posts`;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', {
      title: title,
      description: message,
      user:user.name
    })
  }

  useEffect(() => {
    socket.on('messageSent', () => {
      setRedirectToHome(true);
    });

    return () => {
      socket.off('messageSent');
    };
  }, []);

  if (redirectToHome) {
    redir()
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
        </form>
      </div>
    </div>
  )
}