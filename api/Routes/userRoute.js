import { createUser } from "../Controllers/CreateUser.js";
import express from "express";
import EmailVerify from "../Controllers/EmailVerif.js";
import login from "../Controllers/loginUser.js";
import { forgotPass, reqPass } from "../Controllers/ForgotPass.js";
import createPass from "../Controllers/CreatePasswords.js";
import authMiddleware from "../authMiddleware.js";
import { updatePassword, updateUser } from "../Controllers/Updates.js";
import { deletePass } from "../Controllers/Delete.js";
import { getUser } from "../Controllers/Get.js";
// import EmailVerifi from "../Models/EmailVerification.js";

const userRoute = express.Router();

// Define the POST route for creating a new user
userRoute.post("/register", createUser);
userRoute.post("/verify/:userId", EmailVerify)
userRoute.post("/login", login)
userRoute.post("/reqPass/:email", forgotPass)
userRoute.post("/forgotPass/:token/:userId/:forId", reqPass)
userRoute.post("/createPass/:userId", authMiddleware, createPass)
userRoute.post("/updateUser/:userId",authMiddleware, updateUser)
userRoute.post("/updatePass/:forId/:userId",authMiddleware, updatePassword)
userRoute.post("/deletePass/:forId/:userId", authMiddleware, deletePass)
userRoute.get("/getUser/:userId", authMiddleware, getUser)

export default userRoute;
