import mongoose from "mongoose"

const ForgotSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    token:{
        type:String,
        required:true
    },
    created:{
        type:Date,
        default: Date.now(),
        expires:'15m'
    }
});

const Forpass = mongoose.model("ForgotPassword", ForgotSchema)

export default Forpass