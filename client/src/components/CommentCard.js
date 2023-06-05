import { IoIosTrash, IoMdCreate } from "react-icons/io"
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import io from 'socket.io-client'

const socket = io('http://localhost:4000')


export function CommentCard({ comment }) {

    const { user } = useAuth()


    const handleDelete = (id) => {
        toast((t) => (
            <div>
                <div className="text-black px-3 py-3 mx-3">¿Desea eliminar este comentario?</div>
                <div className="text-black px-3 py-3 mx-3">{id}</div>
                <div className="flex justify-between">
                    <button onClick={() => toast.dismiss(t.id)}>Cancelar</button>
                    <button onClick={() => {
                        socket.emit('deleteComment', id)
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

    return (
        <div className="bg-zinc-800 text-white rounded-sm shadow-md shadow-black hover:bg-zinc-700 hover:cursor-pointer">
            <div className="px-4 py-7">
                <div className="flex justify-between">
                    <h3>
                        {comment.user}
                    </h3>
                    {/* {(() => {
                        if (user.name === comment.user) {
                            return <div>
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    handleDelete(comment._id)
                                }}><IoIosTrash className="w-5 h-5 text-white" /></button>
                            </div>;
                        }
                    })()} */}
                </div>

                <p>
                    {comment.description}
                </p>
            </div>
        </div>
    )
}