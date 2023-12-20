import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors';
import error from './middlewares/error.js';
import mailRouter from './routes/mailRoute.js';

const app = express();


//CONFIG
dotenv.config()
app.use(cors())
app.use(express.json())


//PORT
const PORT = process.env.PORT || 5000
app.use('/api/v1/mail',mailRouter)
app.use(error)

app.listen(PORT, () => {
    console.log(`App Litening ${PORT} Port at ${process.env.ENVIROMENT} ...`);
})