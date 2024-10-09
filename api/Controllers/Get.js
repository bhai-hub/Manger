import User from "../Models/UserSchema.js";
import passwords from "../Models/PasswordSchema.js";
import { Decrypt } from "../utilities/Crypter.js";
const Pass = passwords;

export const getUser = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Fetch all the passwords associated with the user
        const userPasswords = await Promise.all(
            user.passwords.map(async (passId) => {

                const pass = await Pass.findById(passId);

                if(pass){
                    pass.password = Decrypt(pass.password)
                }

                return pass
            })
        );

        return res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                passwords: userPasswords, // Return the list of password objects
            },
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        return res.status(500).json({ message: "Server error", error });
    }
};
