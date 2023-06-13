import { VscEmptyWindow } from 'react-icons/vsc'
import { Link } from "react-router-dom"
import { PostCard } from "../components/PostCard"
import React, { useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:4000')

export function Posts() {
  const [posts, setPosts] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [isConnectedMessage, setIsConnectedMessage] = useState('Disconnect');
  const [buttonH, setButtonH] = useState('');

  // socket.emit('getPosts')
  // socket.on('postsData', (data) => {
  //   setPosts(data);
  // });

  const handleDisconnect = () => {
    if (isConnected) {
      setIsConnectedMessage('Connect')
    } else {
      setIsConnectedMessage('Disconnect')
    }
    setIsConnected(!isConnected);
  };

  if (isConnected) {
    socket.emit('getPosts');
    socket.on('postsData', (data) => {
      setPosts(data);
    });
  }
  if (posts.length === 0) {
    return (
      <div className="flex p-9 m-5 flex-col justify-center items-center">
        <VscEmptyWindow className="w-48 h-48 text-white" />
        <h1 className="text-white text-2xl p-2 m-3">
          There are no posts
        </h1>
        <div>
          <Link to="/new" 
          className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold p-2 m-2 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
          > Create new post</Link>
        </div>
      </div>
    );
  }

  return (

    <div className="text-white p-6 m-2">
      <div className="p-4 justify-around">
        <Link to="/new"
          className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold p-2 m-2 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        > Create new post</Link>
        <button onClick={handleDisconnect}
        className="bg-gradient-to-r from-red-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold p-2 m-2 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
        >{isConnectedMessage}</button>
      </div>
      <div className="grid gap-3">
        {posts.map(post => (
          <PostCard post={post} key={post._id} />
        ))}
      </div>
    </div>
  );
}
