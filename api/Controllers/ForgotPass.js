import Forpass from "../Models/ForgotPassword.js";
import User from "../Models/UserSchema.js";
import { userAvailability } from "../utilities/CheckUser.js";
import sendmail from "../utilities/EmailSender.js";
import { hashPassword } from "../utilities/Password.js";
import { TokenGen } from "../utilities/TokenGen.js";


export const forgotPass = async(req,res)=>{
    const {email} = req.params

    try {
        const user = await User.findOne({email})
        if(!user) res.status(404).json({message:"user not found"});
        const userId = user._id.toString()
        const token = TokenGen(userId)

        const forPass = new Forpass({
            userId,
            token
        })

        await forPass.save()
        await sendmail(user.email, "Forgot Password", `Click on the following link to reset your password http://localhost:3000/forgotPass/${token}/${userId}/${forPass._id}`)
        return res.status(200).json({message:"Email Sent successfully"})

    } catch (error) {
        res.status(500).json({message:"server error", error})
    }
}

export const reqPass = async(req,res)=>{
    const {token,userId, forId}=req.params;
    const {newPass} = req.body

    try {
        const user = await userAvailability(userId);
        if(!user) res.status(404).json({message:"User not found"});
        const pass = await Forpass.findById(forId)

        if(!pass){
            return res.status(401).json({message:'Time up'})
        }

        if(pass.token !== token){
            return res.status(401).json({message:"Invalid Request Made, Try again"})
        }

        const hashedpass = await hashPassword(newPass)

        await user.updateOne({password:hashedpass})
        await Forpass.findByIdAndDelete(forId)
        return res.status(200).json({message:"Your password is changed perfectly"})

    } catch (error) {
        res.status(500).json({message:"Server error", error})
    }
}