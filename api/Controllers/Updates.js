import passwords from "../Models/PasswordSchema.js";
import User from "../Models/UserSchema.js";
import { Encrypt } from "../utilities/Crypter.js";
import { hashPassword } from "../utilities/Password.js";


export const updateUser = async (req, res) => {
    const { userId } = req.params;
    const update = req.body; // Updated to directly extract updates from body

    try {

        const user = await User.findById(userId)

        // Check if the user was found
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (update.password) {
            update.password = await hashPassword(update.password); // Update the password with the hashed version
        }

        const updatedUser = await User.findByIdAndUpdate(userId, update, {
            new: true, // Returns the updated document
            runValidators: true, // Validates the update according to the schema
        });

        return res.status(200).json({ // Changed to 200 for successful updates
            message: "User updated successfully",
            user: updatedUser, // Returning the updated user object directly
        });
    } catch (error) {
        console.error("Error updating user:", error); // Log the error for debugging
        return res.status(500).json({ message: "Server error", error });
    }
};  

export const updatePassword = async (req, res) => {
    const { forId, userId } = req.params; // Extract parameters
    const updates = req.body; // Get updates from request body

    try {
        const pass = await passwords.findById(forId); // Ensure you use the correct model name

        if (!pass) {
            return res.status(404).json({ message: "Password not found" });
        }

        // Check if the password belongs to the user
        if (pass.userId.toString() !== userId) { // Ensure you compare as strings
            return res.status(401).json({ message: "You can't edit this password" });
        }

        if (updates.password) {
            updates.password = Encrypt(updates.password); // Update the password with the hashed version
        }

        const updatedPass = await passwords.findByIdAndUpdate(forId, updates, {
            new: true, // Returns the updated password document
            runValidators: true, // Validates the update
        });

        return res.status(200).json({
            message: "Password updated successfully",
            updatedPass,
        });
    } catch (error) {
        console.error("Error updating password:", error); // Log the error for debugging
        return res.status(500).json({ message: "Server error", error });
    }
};