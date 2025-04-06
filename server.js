import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors'
import { userRegistrationtController } from './controller/userRegistrationController.js';
import { getCurrentBalance } from './controller/getCurrentBalance.js';
import { addAccounts } from './controller/addAccountController.js';
import { makeSpend } from './controller/makeSpend.js';
import { makeDeposit } from './controller/makeDeposit.js';

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

app.post('/current-balance',getCurrentBalance)
app.post('/addAccounts',addAccounts)
app.post('/make-spend',makeSpend)
app.post('/make-deposit',makeDeposit)
  