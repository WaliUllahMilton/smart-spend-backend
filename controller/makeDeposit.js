import mongoose from "mongoose";
import Account from "../models/Account.js";
import Deposit from "../models/Deposit.js";

export const makeDeposit = async (req,res)=>{
    const{amount,location,accountId} =req.body;
    try {
        if(!amount || !location || !accountId){
            return res.status(400).json({
                success : false,
                message : "something wrongs"
            })
        }
        const checkExistingAccount = await Account.findById({_id : accountId})
                if(!checkExistingAccount){
                    return res.status(400).json({
                        success : false,
                        message : "something wrong"
                    })
                }
                const newDeposit = new Deposit({
                    accountInfo : accountId,
                    location,
                    amount,
                    date : Date.now()
                })
                newDeposit.save()
                const updateAccount = await Account.findByIdAndUpdate({
                    _id : accountId
                },{ 
                    $push: { deposits: newDeposit._id },
                    totalBalance : checkExistingAccount.totalBalance + amount
                },
                { new: true }  )
                updateAccount.save()
                return res.status(201).json({
                    success : true,
                    data : newDeposit
                })
    } catch (error) {
        console.log(error)
    }
}
export const getDeposit = async(req,res)=>{
    const {accountInfo} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(accountInfo)){
            return res.status(400).json({
                success : false,
                message : "objectId is not valid"
            })
        }
        const findDepositByUser = await Deposit.find({
            accountInfo : accountInfo
        })
        if(!findDepositByUser.length>0){
            return res.status(404).json({
                success : false,
                message : "no data found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "data found",
            data : findDepositByUser
        })
    } catch (error) {
        console.log(error);
    }
}