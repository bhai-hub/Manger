import mongoose from "mongoose";

const emailVerifiSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    createdAt: {
        type: Date,
        default: Date.now, // Set the default value to the current date and time
        expires: '15m' // Document will expire after 15 minutes
    }
});

// Create the model
const EmailVerifi = mongoose.model('EmailVerifi', emailVerifiSchema);

export default EmailVerifi;
