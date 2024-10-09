import { hashPassword } from "../utilities/Password.js";
import User from "../Models/UserSchema.js";
import sendMail from "../utilities/EmailSender.js";
import EmailVerifi from "../Models/EmailVerification.js";

export const createUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Hash the user's password
    const hashPass = await hashPassword(password);

    // Create a new user and save it to the database
    const newUser = new User({
      name,
      email,
      password: hashPass,
    });

    const savedUser = await newUser.save();

    // Generate OTP (6 digits)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash the OTP before storing it
    const hashedOtp = await hashPassword(otp);

    // Store OTP in email verification schema
    const emailVerif = new EmailVerifi({
      userId: savedUser._id,
      otp: hashedOtp,
      email,
    });

    await emailVerif.save();

    const context = `<p>Your otp for Verification <span style="font-weight:bold">${otp}</span></p>`

    // Send OTP via email
    await sendMail(
        email, 
        "verify Email",
         context);

    // Send success response
    res.status(201).json({
      message: "User created successfully. Please verify your email.",
    });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
