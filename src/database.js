import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const conn_str = process.env.MONGO_URL
mongoose.connect(
    conn_str,
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    },(err) => {
        if (err) {
            console.log("error in connection");
        } else {
            console.log("mongodb is connected");
        }
    }
);
