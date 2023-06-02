import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import { connectDB } from './db.js'
import cors from 'cors'
import Post from './models/Post.js'

const port = 4000
const ip = '192.168.1.79'

const app = express()
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        origin: "*"
    }
})

connectDB()

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

io.on('connection', (socket) => {
    console.log('connected');

    socket.on('getPosts', async () => {
        try {
            const posts = await Post.find({});
            // console.log(posts)
            socket.emit('postsData', posts);
        } catch (error) {
            socket.emit('postsData', []);
            console.error('Error al obtener los posts:', error);
        }
    });

    socket.on('message', (data) => {
        console.log('Message received', data);

        const newMessage = new Post({
            title: data.title,
            description: data.description,
            user: data.user,
        });

        newMessage.save()
            .then(() => {
                console.log('Mensaje guardado en la base de datos');
                socket.emit('messageSent');
            })
            .catch((error) => {
                console.error('Error al guardar el mensaje:', error);
            });
    });
    socket.on('deletePost', async (data) => {
        console.log('delete received', data);
        try {
            const post = await Post.findByIdAndDelete(data);
            if (!post) {
                socket.emit('deleteResponse',{susses:false,respose:'Post not found'})
            }
            socket.emit('deleteResponse',{susses:true,respose:'Post deleted'})
        } catch (error) {
            console.error(error);
            socket.emit('deleteResponse',{susses:false,respose:error.message})
        }
    });
});


// server.listen(port,ip)
server.listen(port)
console.log(`Server on ${port}`)