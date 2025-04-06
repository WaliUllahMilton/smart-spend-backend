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