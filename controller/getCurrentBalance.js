import Account from "../models/Account.js";
import User from "../models/User.js";

export const getCurrentBalance = async (req,res)=>{
    const {userId} = req.body;
    console.log(userId);
    try {
        if(!userId){
            return res.status(404).json({
                success : false,
                message : "login required"
            })
        }
        const existingUser = await User.findById(userId)
        if(!existingUser){
            return res.status(404).json({
                success : false,
                message : "login failed",
                user : existingUser
            })
        }
        const accountData = await Account.findById(existingUser.accountInfo)
        const acc = await Account.find()
        if(!accountData){
            return res.status(404).json({
                success : false,
                message : "no account find",
                // acc : acc,
                id: existingUser.accountInfo,
                existingUser: existingUser
            })
        }
        return res.status(200).json({
            success : true,
            currentBalance : accountData.totalBalance
        })
    } catch (error) {
        console.log(error)
    }
}