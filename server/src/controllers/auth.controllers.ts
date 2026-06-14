import { Request,Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.models";

export const registerUser = async(
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const { name,email,password } = req.body;
    
        const existingUser = await User.findOne({email});
    
        if(existingUser){
            res.status(400).json({
                message:"User already exists",
            })
            return;
        };
    
        const hashedPassword = await bcrypt.hash(password,10);
    
        const user = await User.create({
            name,
            email,
            password:hashedPassword,
        });
    
        const createdUser = await User.findById(user._id);

        res.status(201).json({
            message:"User created successfully!",
            user:createdUser,
        });
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
        console.log(error);
    }
}
