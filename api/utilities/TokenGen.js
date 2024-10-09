import jwt from "jsonwebtoken";

export const TokenGen = (userId) => {
    if (!userId) return "no userId";
    
    // Create a token with userId as part of the payload
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
    
    return token;
};
