import mongoose from "mongoose";

const passwordSChema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    nameP:{
        type:String,
        required:true
    }
})

const passwords = mongoose.model("Passwords", passwordSChema)

export default passwords