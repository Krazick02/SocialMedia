import mongoose from "mongoose";

const MONGO_USERNAME = 'root';
const MONGO_PASSWORD = 'root';
const MONGO_HOSTNAME1 = '172.17.212.66';
const MONGO_PORT1 = '27017';
const MONGO_HOSTNAME2 = '172.17.213.42';
const MONGO_PORT2 = '27017';
const MONGO_HOSTNAME3 = '172.17.213.78';
const MONGO_PORT3 = '27017';
const MONGO_DB = 'blog';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME1}:${MONGO_PORT1},${MONGO_HOSTNAME2}:${MONGO_PORT2},${MONGO_HOSTNAME3}:${MONGO_PORT3}/${MONGO_DB}?authSource=admin`;
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME1}:${MONGO_PORT1}/${MONGO_D3}?authSource=admin`;

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

