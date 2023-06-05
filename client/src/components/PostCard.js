import { IoIosTrash, IoMdCreate } from "react-icons/io"
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import io from 'socket.io-client'
import { useEffect, useState } from "react";

const socket = io('http://localhost:4000')


export function PostCard({ post }) {

    const navigate = useNavigate()
    const { user } = useAuth()
    const [description,setDescription] = useState('')


    const handleDelete = (id) => {
        toast((t) => (
            <div>
                <div className="text-black px-3 py-3 mx-3">¿Desea eliminar esta publicacion?</div>
                <div className="text-black px-3 py-3 mx-3">{id}</div>
                <div className="flex justify-between">
                    <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                    <button onClick={() => {
                        socket.emit('deletePost', id)
                        toast.dismiss(t.id)
                    }}
                        className="bg-red-500 hover:bg-red-400 px-3 py-2 text-sm text-white rounded-md mx-2"
                    >Eliminar</button>
                </div>
            </div>
        ), {
            style: {
                background: "202020"
            }
        });
    }
    // useEffect(() => {
    //     setDescription(post.description.replaceAll(' ','_'))
    //   }, []);
    return (
        <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer">
            <div className="px-4 py-7">
                <div className="flex justify-between">
                    <h3>
                        {post.user}
                    </h3>
                    <h3>
                        {post.title}
                    </h3>
                    {/* { }{

                    }
                    {(() => {
                        if (user.name === post.user) {
                            return <div>
                                <button onClick={() => navigate(`/posts/${post._id}`)}><IoMdCreate className="w-5 h-5 text-white" /></button>
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(post._id)
                                }}><IoIosTrash className="w-5 h-5 text-white" /></button>
                            </div>;
                        }
                    })()} */}
                </div>

                <p>
                    {post.description}
                </p>
                <button onClick={() => navigate(`/comments/${post._id}`)}>comments</button>
                {/* {post.image && <img alt="publicaction" src={post.image.url}/>} */}
            </div>
        </div>
    )
}