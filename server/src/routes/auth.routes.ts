import express from "express";

import { changePassword, getCurrentUser, loginUser, registerUser, updateProfile } from "../controllers/auth.controllers";
import { authMiddleware } from "../middlewares/auth.middlewares";

const authRouter = express.Router()

authRouter.post("/register",registerUser);
authRouter.post("/login",loginUser);
authRouter.get("/me", authMiddleware, getCurrentUser);
authRouter.put("/profile", authMiddleware, updateProfile);
authRouter.put("/change-password",authMiddleware,changePassword);

export default authRouter;