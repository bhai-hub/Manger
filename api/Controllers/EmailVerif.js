import EmailVerifi from "../Models/EmailVerification.js";
import User from "../Models/UserSchema.js";
import sendMail from "../utilities/EmailSender.js";
import { comparePassword, hashPassword } from "../utilities/Password.js";

const EmailVerify = async (req, res) => {
  const { otp } = req.body;
  const { email } = req.params;

  try {
    // Find the user by ID
    const user = await User.findByOne({email});
    const userId = user._id.toString()
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // If user is already verified, return a message
    if (user.isVerified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    // Find the email verification record
    const verify = await EmailVerifi.findOne({ userId });
    if (!verify) {
      // If no verification record exists, generate a new OTP and resend it
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedOtp = await hashPassword(newOtp); // Don't forget to await this
      await sendMail(user.email, newOtp); // Send the new OTP

      // Create a new verification record
      const emailVeri = new EmailVerifi({
        userId,
        email: user.email,
        otp: hashedOtp,
      });

      await emailVeri.save();
      return res.status(400).json({ message: "New OTP sent. Please try again." });
    }

    // Compare the OTP with the hashed OTP
    const isMatch = await comparePassword(otp, verify.otp);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect OTP" });
    }

    // Mark the user as verified
    await user.updateOne({ isVerified: true });

    // Optionally, delete the verification record after successful verification
    await EmailVerifi.deleteOne({ userId });

    // Send success response
    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export default EmailVerify;
