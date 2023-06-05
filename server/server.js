import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import { connectDB } from './db.js'
import cors from 'cors'
import Post from './models/Post.js'
import User from './models/User.js'
import Comment from './models/Comment.js'

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
    //Inicia modulo de post
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
    socket.on('getPost', async (data) => {
        try {
            const post = await Post.findById(data);
            if (post) {
                console.log('Post encontrado');
                socket.emit('postData', { success: true, post: post });
            } else {
                console.log('Error al buscar el post');
                socket.emit('postData', { success: false, message: 'post no encontrado' });
            }
        } catch (error) {
            console.error('Error al buscar el post:', error);
            socket.emit('postData', { success: false, message: error.message });
        }
    });

    socket.on('setPost', async (data) => {
        console.log('Post received', data);

        const newMessage = new Post({
            title: data.title,
            description: data.description,
            user: data.user,
        });

        await newMessage.save()
            .then(() => {
                console.log('Post guardado en la base de datos');
                socket.emit('postSaved', { success: true, message: 'Post saved' })
            })
            .catch((error) => {
                console.error('Error al guardar el post:', error);
                socket.emit('postSaved', { success: false, message: 'Post not saved' })
            });
    });
    socket.on('updatePost', async (data) => {
        console.log('Post update received', data);
        await Post.updateOne(data.id, data.body)
            .then(() => {
                console.log('Post actualizado en la base de datos');
                socket.emit('postSaved', { success: true, message: 'Post saved' })
            })
            .catch((error) => {
                console.error('Error al guardar el post:', error);
                socket.emit('postSaved', { success: false, message: 'Post not saved' })
            });
    });
    socket.on('deletePost', async (data) => {
        console.log('delete received', data);
        try {
            const post = await Post.findByIdAndDelete(data);
            if (!post) {
                socket.emit('deleteResponse', { success: false, message: 'Post not found' })
            }
            socket.emit('deleteResponse', { success: true, message: 'Post deleted' })
        } catch (error) {
            console.error(error);
            socket.emit('deleteResponse', { success: false, message: error.message })
        }
    });

    //Inicia modulo de comentarios
    socket.on('getComments', async (data) => {
        try {
            const comments = await Comment.find({post:data});
            // console.log(comments)
            socket.emit('commentsData', comments);
        } catch (error) {
            socket.emit('commentsData', []);
            console.error('Error al obtener los comentario:', error);
        }
    });

    socket.on('setComment',async (data) => {
        console.log('Comment received', data);

        const newComment = new Comment({
            post: data.post,
            description: data.description,
            user: data.user,
        });

        newComment.save()
            .then(() => {
                console.log('Comentario guardado en la base de datos');
                socket.emit('commentSaved', { success: true, message: 'Comment saved' })
            })
            .catch((error) => {
                console.error('Error al guardar el mensaje:', error);
                socket.emit('commentSaved', { success: false, message: 'Comment not saved' })
            });
    });

    socket.on('deleteComment', async (data) => {
        console.log('delete received', data);
        try {
            const post = await Comment.findByIdAndDelete(data);
            if (!post) {
                socket.emit('deleteResponse', { success: false, message: 'Comment not found' })
            }
            socket.emit('deleteResponse', { success: true, message: 'Comment deleted' })
        } catch (error) {
            console.error(error);
            socket.emit('deleteResponse', { success: false, message: error.message })
        }
    });

    // Inicia modulo de usuarios 
    socket.on('register', async (data) => {
        const { name, email, password } = data;
        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                console.log('email already exists');
                socket.emit('registerResponse', { success: false, message: 'email already exists' });
                return;
            }

            // const hashedPassword = await bcrypt.hash(password, 10);
            // const newUser = new User({ name, email, password: hashedPassword });
            const newUser = new User({ name, email, password });
            await newUser.save();
            console.log('Register success ', data);
            socket.emit('registerResponse', { success: true, message: 'Register success' });
        } catch (error) {
            console.error(error);
            socket.emit('registerResponse', { success: false, message: error.message });

        }
    });
    socket.on('login', async (data) => {
        const { email, password } = data;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                console.log('Invalid email');
                socket.emit('loginResponse', { success: false, message: 'Invalid email' });
                return;
            }

            // const passwordMatch = await bcrypt.compare(password, user.password);
            const passwordMatch = password === user.password ? true : false;
            if (!passwordMatch) {
                console.log('Invalid password');
                socket.emit('loginResponse', { success: false, message: 'Invalid password' });
                return;
            }

            // Generar un token de acceso o cualquier información adicional
            // const token = generateToken(user);
            const { id, name } = user
            console.log('Login success ', data);

            socket.emit('loginResponse', {
                success: true, user: {
                    id,
                    name
                }
            });
        } catch (error) {
            console.error(error);
            socket.emit('loginResponse', { success: false, message: 'Login failed' });
        }
    });
});


// server.listen(port,ip)
server.listen(port)
console.log(`Server on ${port}`)