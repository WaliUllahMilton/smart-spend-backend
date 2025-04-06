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