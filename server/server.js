import express from 'express'
import fileUpload from 'express-fileupload'
import postsRoutes from './routes/posts.routes.js'
import { connectDB } from './db.js'

const port = 4000
const app = express()

connectDB()

app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload'
}))

app.use(postsRoutes)
app.listen(port)
console.log(`Server on ${port}`)