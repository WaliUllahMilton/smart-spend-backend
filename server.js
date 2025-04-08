import express from 'express'
import 'dotenv/config'
import mongoose from 'mongoose';
import cors from 'cors'
import { userRegistrationtController } from './controller/userRegistrationController.js';
import { getCurrentBalance } from './controller/getCurrentBalance.js';
import { addAccounts } from './controller/addAccountController.js';
import { getSpend, makeSpend } from './controller/makeSpend.js';
import { getDeposit, makeDeposit } from './controller/makeDeposit.js';
import { userLoginController } from './controller/userLoginController.js';

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
app.post('/login',userLoginController)
app.get('/current-balance',getCurrentBalance)
app.post('/addAccounts',addAccounts)
app.post('/make-spend',makeSpend)
app.get('/get-spend',getSpend)
app.post('/make-deposit',makeDeposit)
app.get('/get-deposit',getDeposit)
  