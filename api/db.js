import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const db = async ()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log("db connected ")
    } catch (error) {
        console.error(`Error: ${error.message}`);
    process.exit(1); // Exit process with failure
    }
}

export default db