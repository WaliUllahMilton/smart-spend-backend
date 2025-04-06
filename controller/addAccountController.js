import Account from "../models/Account.js";
import User from "../models/User.js";

export const addAccounts = async (req,res)=>{
    const {userId} = req.body;
    try {
        if(!userId ){
            return res.status(404).json({
                success : false,
                message : "user is not valid"
            })
        }
        const checkExistingUser = await User.findById(userId)
        if(!checkExistingUser){
            return res.status(404).json({
                success : false,
                message : "user is not valid"
            })
        }
        const checkExistingAccount = await Account.findById(checkExistingUser.accountInfo)
        if(checkExistingAccount){
            return res.status(400).json({
                success : false,
                message : "one account already added"
            })
        }
        const newAccounts = new Account({
            totalBalance : (Math.random()*100000).toFixed(3),
            user : userId
        })
        newAccounts.save()
        const updateUser = await User.findByIdAndUpdate({
            _id: userId
        })
        return res.status(201).json({
            success : true,
            data : newAccounts
        })
    } catch (error) {
        console.log(error)
    }
}