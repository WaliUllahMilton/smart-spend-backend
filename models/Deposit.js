import mongoose from "mongoose";

const depositSchema = new mongoose.Schema({
    amount : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    accountInfo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Account",
        required : true
    }
},{timestamps : true});

const Deposit = mongoose.model('Deposit',depositSchema);
export default Deposit;