import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors'
import { userRegistrationtController } from './controller/userRegistrationController.js';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`)
})

mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then(()=>console.log('mongo connected')).catch((error)=>console.log(error))


app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.post('/signup',userRegistrationtController)
  
  