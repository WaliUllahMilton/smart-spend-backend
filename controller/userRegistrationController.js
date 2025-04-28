import User from "../models/User.js";


export const userRegistrationtController = async (req,res)=>{
    const{firstName,lastName,email,password,phone,company,accountInfo} = req.body;
    try {
        if(!firstName || !lastName || !email || !password || !phone){
            return res.status(400).json({
                status : false,
                message : "all field are required"
            })
        }
        const checkExistingUser = await User.findOne({
            email : email
        })
        if(checkExistingUser){
            return res.status(400).json({
                success : false,
                message : "user already exist please signin"
            })
        }
        const user = new User({
            firstName,
            lastName,
            email,
            password,
            phone,
            company,
            accountInfo
        })
        user.save()
        return res.status(201).json({
            status : true,
            data : user
        })
    } catch (error) {
        console.log(error)
    }

}