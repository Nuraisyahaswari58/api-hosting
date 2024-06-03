import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors'

dotenv.config();
const app = express();

app.use(express.json());    
app.use(router);
app.use(morgan('dev'));
app.use(helmet());
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});