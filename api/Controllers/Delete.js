import passwords from "../Models/PasswordSchema.js";
import User from "../Models/UserSchema.js";

export const deletePass = async(req,res)=>{
    const {userId, forId} = req.params;
    try {
        const pass = await passwords.findById(forId)

        if(!pass){
            return res.status(404).json({message:"not valid request"})
        }

        if (pass.userId.toString() !== userId) { // Ensure you compare strings
            return res.status(401).json({ message: "Action not allowed" });
        }

        await passwords.findByIdAndDelete(forId)
        await User.findByIdAndUpdate(userId, {
            $pull: { passwords: forId }, // Pulls the password id from the user's passwords array
        });
        return res.status(200).json({ message: "Password deleted successfully" });
    } catch (error) {
        console.error("Error deleting password:", error); // Log the error for debugging
        return res.status(500).json({ message: "Server error", error });
    }
}