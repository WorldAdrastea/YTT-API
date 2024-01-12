import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './router/router';

dotenv.config();

const app = express();

app.use(express.json())

//Middlewares
app.use(cookieParser());
app.use(compression());
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
}));


const port = 8080

app.get('/', (req: express.Request, res: express.Response) => {  
  res.send('Hello from Express!')
})

app.listen(port, () => {  
  console.log(`server is listening on ${port}`)
})

app.use('/', router());

//MongoDB Connection
mongoose.Promise = Promise;

// mongoose.connect(process.env.MONGO_URL);

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Connected to MongoDB');
    } catch (error) {
    console.error('MongoDB connection error:', error);
    }
}
  
connectToDatabase();

mongoose.connection.on('error', (error: Error) => console.log(error))



