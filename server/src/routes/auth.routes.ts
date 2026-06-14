import express from "express";

import { registerUser } from "../controllers/auth.controllers";

const authRouter = express.Router()

authRouter.post("/register",registerUser);

export default authRouter;