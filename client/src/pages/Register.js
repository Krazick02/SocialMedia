import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import io from 'socket.io-client'

const local = io('http://localhost:4000')
const maquina1 = io('http://localhost:4001')
const maquina2 = io('http://localhost:4002')


export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerResponse, setRegisterResponse] = useState({ success: null, message: '' });
  const history = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    local.emit('register', {
      name: name,
      email: email,
      password: password,
    })
    maquina1.emit('register', {
      name: name,
      email: email,
      password: password,
    })
    maquina2.emit('register', {
      name: name,
      email: email,
      password: password,
    })
  }

  useEffect(() => {
    local.on('registerResponse', (data) => {
      setRegisterResponse(data);
      if (data.success) {
        console.log(data)
        history("/")
      }
    });

    return () => {
      local.off('registerResponse');
    };
  }, []);
  return (
    <div className="flex items-center justify-center" >
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">

        <header className="flex items-center py-4 px-4 text-white justify-between">
          <h3 className="text-xl">Registrar Usuario</h3>
          <Link to='/' className="text-gray-400 text-sm hover:text-gray-300"> Regresar</Link>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="">Name</label>
          <input type="text" onChange={e => setName(e.target.value)} />
          <label htmlFor="">Email</label>
          <input type="email" onChange={e => setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          <button>Send</button>
          {registerResponse.success === false && <p>{registerResponse.message}</p>}

        </form>
      </div>
    </div>
  )
}