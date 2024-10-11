import User from "../Models/UserSchema.js";
import jwt from "jsonwebtoken";
import { comparePassword } from "../utilities/Password.js";

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Wrong password!" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email }, // Payload
      process.env.JWT_SECRET // Token expiration time
    );

    // Send success response with token
    return res.status(200).json({
      message: "Successfully logged in!",
      token, // Send the token to the client
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        token
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default login;
