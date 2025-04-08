import User from "../models/User.js";

export const userLoginController = async(req,res)=>{
    const {email,password} = req.body;
    try {
        if(!email || !password){
            return res.status(400).json({
                success : false,
                message : "email and password required"
            })
        }
        const checkExistingUser = await User.findOne({
            email : email
        })
        if(!checkExistingUser){
            return res.status(404).json({
                success : false,
                message : "user is invalid"
            })
        }
        const loginUser = await User.findOne({
            email : email,
            password : password
        })
        if(!loginUser){
            return res.status(404).json({
                success : false,
                message : "incorrect email or password"
            })
        }
        return res.status(200).json({
            success : true,
            message : "login succesfull",
            data : loginUser
        })
    } catch (error) {
        console.log(error);
    }
}