import mongoose from "mongoose";

const MONGO_USERNAME = 'admin';
const MONGO_PASSWORD = 'password';
const MONGO_HOSTNAME1 = '172.17.179.138';
const MONGO_PORT1 = '27017';
const MONGO_HOSTNAME2 = '172.17.179.199';
const MONGO_PORT2 = '27017';
const MONGO_HOSTNAME3 = '172.17.177.196';
const MONGO_PORT3 = '27017';
const MONGO_DB = 'blog';

const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME1}:${MONGO_PORT1},${MONGO_HOSTNAME2}:${MONGO_PORT2},${MONGO_HOSTNAME3}:${MONGO_PORT3}/${MONGO_DB}?authSource=admin`;
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME1}:${MONGO_PORT1}/${MONGO_D3}?authSource=admin`;
// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME1}:${MONGO_PORT1}/${MONGO_DB}?authSource=admin`;


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

