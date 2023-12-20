import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import error from '../middlewares/error.js';
import mailRouter from '../routes/mailRoute.js';
import serverless from 'serverless-http';

const app = express();


//CONFIG
dotenv.config()
app.use(cors())
app.use(express.json())



app.use('/.netlify/functions/api',mailRouter)
app.use(error)

export const handler=serverless(app);