import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        unique : true,
        required : true
    },
    company : {
        type : String,
        required : false
    },
    accountInfo : {
        type : String,
        required : false
    }
});

const User = mongoose.model("User",userSchema);
export default User;