import nodemailer from "nodemailer"
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const sendmail = async(to, subject, context)=>{

    try {

        const transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASSWORD
            }
        })
    
        const mailOptions ={
            from: process.env.EMAIL_USER,
            to:to,
            subject:subject,
            html:context
        }
    
        const info = await transporter.sendMail(mailOptions)
        return info.response
        
    } catch (error) {
        throw error
    }
    
}

export default sendmail
