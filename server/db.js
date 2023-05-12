import mongoose from "mongoose";

const MONGO_USERNAME = 'root';
const MONGO_PASSWORD = 'root';
const MONGO_HOSTNAME1 = '192.168.1.68';
const MONGO_PORT1 = '27017';
const MONGO_HOSTNAME2 = '192.168.1.84';
const MONGO_PORT2 = '27017';
const MONGO_DB = 'blog';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME1}:${MONGO_PORT1},${MONGO_HOSTNAME2}:${MONGO_PORT2}/${MONGO_DB}?authSource=admin`;

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@localhost:27017/${MONGO_DB}?authSource=admin`;
// const url = `mongodb://root2:root2@localhost:27017/blog`;

export async function connectDB (){
    try {
        await mongoose.connect(url,{
            retryWrites: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
          })
        console.log('Connected to mongoDB')
    } catch (error) {
        console.log(error)
    }
}

