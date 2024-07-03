import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const conn_str = process.env.MONGO_URL

mongoose.set('strictQuery', true)

const connection = async()=>{
    try {
        const {connection} = await mongoose.connect(
            conn_str
        );
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
    } catch (error) {
        console.log(error);
    }
}

export default connection
