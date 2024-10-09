import Password from "../Models/PasswordSchema.js"; // Ensure you have the correct model name
import { userAvailability } from "../utilities/CheckUser.js";
import { Encrypt } from "../utilities/Crypter.js";

const createPass = async (req, res) => {
    const userId = req.params.userId; // Adjusted to correctly extract userId from params
    const { nameP, password } = req.body;

    try {
        // Check if the user exists
        const user = await userAvailability(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate input fields
        if (!nameP || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Hash the password
        const hashedPassword = Encrypt(password);

        // Create a new password entry
        const pass = new Password({
            userId, // Assuming userId is the correct field name in your Password schema
            nameP,
            password: hashedPassword,
        });

        // Save the password entry
        await pass.save();

        // Update the user with the new password ID
        await user.updateOne({ $push: { passwords: pass._id.toString() } }); // Assuming you have a 'passwords' field in the user model

        // Send success response
        res.status(201).json({ message: "Password created successfully!", pass });
    } catch (error) {
        console.error("Error creating password:", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
};

export default createPass;
