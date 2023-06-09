import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import io from 'socket.io-client'
import useAuth from '../context/useAuth';


const socket = io('http://localhost:4000')


export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginResponse, setLoginResponse] = useState({ success: null, message: '' });

  const {login} = useAuth()

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
    <div >
      {/* <div className="bg-zinc-800 p-10 shadow-md shadow-black">

        <header className="flex items-center py-4 px-4 text-white justify-center">
          <h3 className="text-5xl border-4"> Iniciar sesion</h3>
        </header>
        <form onSubmit={handleSubmit} className="text-white text2xl justify-center">
          <label htmlFor="">Email</label>
          <input type="email" onChange={e => setEmail(e.target.value)} />
          <label htmlFor="">Password</label>
          <input type="password" onChange={e => setPassword(e.target.value)} />
          {loginResponse.success === false && <p>{loginResponse.message}</p>}
          <button>Send</button>
        </form>
          <Link to='/' className="text-gray-400 text-sm hover:text-gray-300"> Regresar</Link>
      </div> */}
      <div class="min-h-screen dark:text-slate-400 bg-white dark:bg-slate-900 text-gray-900 flex justify-center">
          <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 dark:text-slate-400 bg-white dark:bg-slate-900">
              <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12  dark:text-slate-400 bg-white dark:bg-slate-800 rounded">
                  <div>
                      <h4 className="my-4  md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-center">
                        Bienvenido a InstaTweet
                      </h4>
                  </div>
                  <div class="mt-12 flex flex-col items-center ">
                      <h1 class="text-2xl xl:text-3xl font-extrabold">
                          Sign up
                      </h1>
                      <div class="w-full flex-1 mt-8">


                          <div class="my-12 border-b text-center">
                              <div
                                  class="leading-none px-2 inline-block text-sm text-white tracking-wide font-medium bg-slate-800 transform translate-y-1/2">
                                  sign up with e-mail
                              </div>
                          </div>

                          <div class="mx-auto max-w-xs">
                              <form onSubmit={handleSubmit}>
                                  <input
                                      class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                      type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
                                  <input
                                      class="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                      type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                                       {loginResponse.success === false && <p>{loginResponse.message}</p>}
                                  <button
                                      class="mt-5 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                      <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round">
                                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                          <circle cx="8.5" cy="7" r="4" />
                                          <path d="M20 8v6M23 11h-6" />
                                      </svg>
                                      <span class="ml-3">
                                          Sign Up
                                      </span>
                                  </button>
                                  
                              </form>
                          </div>

                          <div class="my-12 border-b text-center">
                              <div
                                  class="leading-none px-2 inline-block text-sm text-white tracking-wide font-medium bg-slate-800 transform translate-y-1/2">
                                  You haven't accounted yet
                              </div>
                          </div>
                          
                          <div class="my-12">
                              <a href="register.html">
                                  <Link to="/newUser"

                                      class="mt-5 tracking-wide font-semibold bg-blue-700 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                      <svg class="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                          stroke-linecap="round" stroke-linejoin="round">
                                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                          <circle cx="8.5" cy="7" r="4" />
                                          <path d="M20 8v6M23 11h-6" />
                                      </svg>        
                                      <span class="ml-3">
                                          Register
                                      </span>
                                  </Link>
                              </a>
                          </div>
                          <p class="mt-6 text-xs text-gray-600 text-center">
                              I agree to abide by templatana's
                              <a href="javascript:void(0)" class="border-b border-gray-500 border-dotted">
                                  Terms of Service
                              </a>
                              and its
                              <a href="javascript:void(0)" class="border-b border-gray-500 border-dotted">
                                  Privacy Policy
                              </a>
                          </p>
                      </div>
                  </div>
              </div>
              
          </div>
      </div>
    </div>
  )
}