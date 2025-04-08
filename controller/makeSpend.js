import mongoose from "mongoose";
import Account from "../models/Account.js";
import Spend from "../models/Spend.js";

export const makeSpend = async (req,res)=>{
    const{remarks,accountId,location,amount} = req.body;
    try {
        if(!accountId || !location || !amount){
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
        const newSpendAdd = new Spend({
            remarks,
            accountInfo : accountId,
            location,
            amount,
            date : Date.now().toString()
        })
        newSpendAdd.save()
        const updateAccount = await Account.findByIdAndUpdate({
            _id : accountId
        },{ 
            $push: { spends: newSpendAdd._id },
            totalBalance : checkExistingAccount.totalBalance - amount
        },
        { new: true }  )
        updateAccount.save()
        return res.status(201).json({
            success : true,
            data : newSpendAdd
        })
    } catch (error) {
        console.log(error)
    }
}

export const getSpend = async(req,res)=>{
    const {accountInfo} = req.body;
    try {
        if(!mongoose.Types.ObjectId.isValid(accountInfo)){
            return res.status(400).json({
                success : false,
                message : "objectId is not valid"
            })
        }
        const findSpendByUser = await Spend.find({
            accountInfo : accountInfo
        })
        if(!findSpendByUser.length>0){
            return res.status(404).json({
                success : false,
                message : "no data found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "data found",
            data : findSpendByUser
        })
    } catch (error) {
        console.log(error);
    }
}