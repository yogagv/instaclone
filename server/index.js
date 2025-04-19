import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import postRoute from './routes/post.js';
import suggestionsRoute from './routes/suggestions.js';
import statusRoute from './routes/status.js'


//env config
dotenv.config();

//start the express server
const app = express();

//configure mongodb

mongoose.set('strictQuery', false);

//PORT 

const port = process.env.PORT || 5000 

const connectDB = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);
        console.log('DB Connection Established!');
    
    } catch(error) {
        console.log('DB Connection Error', error);
    }
}

app.use(express.json());

app.use(cors({
    origin: function(origin, callback){
        return callback(null, true)
    },
    optionsSuccessStatus: 200,
    credentials: true
}))

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/user', userRoute);
app.use('/api/v1/post', postRoute);
app.use('/api/v1/suggestion', suggestionsRoute)
app.use('/api/v1/status', statusRoute)

connectDB()
.then(() => {
    app.listen(port, () => {
        console.log(`server is running in port ${port}`);
    })
})
.catch((error) => {
    console.log(error);
})

