import mongoose from "mongoose";

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']  
    },
    password:{
        type:String,
        required:true
    },
    passwords:{
        type:Array
    },
    isVerified:{
        type:Boolean,
        default:false
    }
})

const User = mongoose.model('User', user)

export default User;