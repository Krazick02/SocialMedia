import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

import io from 'socket.io-client'

const socket = io('http://localhost:4001')


export function Register(){
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  let redir = () => {
    window.location.href = `/`;
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('register', {
      name: name,
      email: email,
      password: password,
    })
  }

  useEffect(() => {
    socket.on('registrationSuccess', () => {
      setRedirectToHome(true);
    });

    return () => {
      socket.off('registrationSuccess');
    };
  }, []);

  if (redirectToHome) {
    redir()
  }
  return(
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
        </form>
      </div>
    </div>
  )
}