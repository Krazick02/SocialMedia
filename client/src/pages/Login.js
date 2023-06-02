import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import useAuth from '../context/useAuth';


const socket = io('http://172.17.179.199:4001')


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState({ success: null, message: '' });

  const {login, user} = useAuth()

  const history = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('login', {
      email: email,
      password: password,
    })
  }

  useEffect(() => {
    socket.on('loginResponse', (data) => {
      setLoginResponse(data);
      if (data.success) {
        login(data.user)
        console.log(data)
        history("/posts")
      }
    });

    return () => {
      socket.off('loginResponse');
    };
  }, []);

  return (
    <div className="flex items-center justify-center" >
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">

        <header className="flex items-center py-4 px-4 text-white justify-between">
          <h3 className="text-xl"> Iniciar sesion</h3>
          <Link to='/' className="text-gray-400 text-sm hover:text-gray-300"> Regresar</Link>
        </header>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">Email</label>
          <input type="email" onChange={e => setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <button>Send</button>
          {loginResponse.success === false && <p>{loginResponse.message}</p>}
        </form>
      </div>
    </div>
  )
}