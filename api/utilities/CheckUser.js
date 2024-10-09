import User from "../Models/UserSchema.js";

export const userAvailability = async(userId)=>{
    try {
        const user = await User.findById(userId)
        return user
    } catch (error) {
        throw error
    }
}