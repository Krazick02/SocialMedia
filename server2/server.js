import express from 'express'
import morgan from 'morgan'
import { Server as SocketServer } from 'socket.io'
import http from 'http'
import { connectDB } from './db.js'
import cors from 'cors'
import User from './models/User.js'
import bcrypt from 'bcrypt';

const port = 4001
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
    console.log('connected')

    socket.on('register', async (data) => {
        console.log('register recived', data)

        const { name, email, password } = data;
    
        try {
          const existingUser = await User.findOne({ email });
          if (existingUser) {
            socket.emit('registrationError', 'email already exists');
            return;
          }
    
          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({name, email, password: hashedPassword });
          await newUser.save();
    
          socket.emit('registrationSuccess');
        } catch (error) {
          console.error(error);
          socket.emit('registrationError', 'Registration failed');
        }
      });
    socket.on('login', function (data) {
        console.log('Login recived', data)

        socket.on('login', async (data) => {
          const { email, password } = data;
      
          try {
            const user = await User.findOne({ email });
            if (!user) {
              socket.emit('loginResponse', { success: false, message: 'Invalid email' });
              return;
            }
      
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
              socket.emit('loginResponse', { success: false, message: 'Invalid password' });
              return;
            }
      
            // Generar un token de acceso o cualquier información adicional
            // const token = generateToken(user);
            const {id , name } = user
            socket.emit('loginResponse', { success: true, user:{
              id,
              name
            } });
          } catch (error) {
            console.error(error);
            socket.emit('loginResponse', { success: false, message: 'Login failed' });
          }
        });
      
    })
})

// server.listen(port,ip)
server.listen(port)
console.log(`Server on ${port}`)