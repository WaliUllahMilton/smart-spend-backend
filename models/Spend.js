import mongoose from "mongoose";

const spendSchema = new mongoose.Schema({
    remarks : {
        type : String,
        required : false
    },
    amount : {
        type : Number,
        required : true
    },
    location : {
        type : String,
        required : false
    },
    accountInfo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "accounts",
        required : true
    }
})
const Spend = mongoose.model("Spend",spendSchema);
export default Spend;