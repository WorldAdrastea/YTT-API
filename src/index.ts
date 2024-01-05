import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose, { ConnectOptions } from 'mongoose';
import dotenv from 'dotenv';
import router from './router/router';

dotenv.config();

const app = express();

app.use(cors({
    credentials: true,
}));

//Middlewares
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use('/', router);

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server running on http://localhost:8080');
});

//MongoDB Connection
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} as ConnectOptions);
mongoose.connection.on('error', (error: Error) => console.log(error))
