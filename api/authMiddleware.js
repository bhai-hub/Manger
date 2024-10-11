import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Check if Authorization header exists
  const authHeader = req.headers.authorization;
  
  // Check if token exists
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization denied, token missing or malformed" });
  }

  const token = authHeader.split(" ")[1];  // Extract token

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info to request object
    req.user = decoded;
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    // Handle invalid token
    return res.status(401).json({ message: "Token is not valid", error: error.message });
  }
};

export default authMiddleware;
