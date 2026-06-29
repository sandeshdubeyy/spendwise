import { Request,Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User.models";
import generateToken from "../utils/generateToken.utils";

//all functions are tested and working 29 june 2026

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

export const loginUser = async(
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const {email,password} = req.body;
    
        const user = await User.findOne({email}).select("+password");

        if(!user){
            res.status(401).json({
                message:"No account found with this email. Please register first.",
            })
            return;
        };
        
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            res.status(401).json({
                message:"Incorrect password. Please try again.",
            })
            return;
        }

        const token= generateToken(
            user._id.toString()
        );

        res.status(201).json({
            message:"Login successful.",
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    } catch (error) {
        res.status(500).json({
            message:"Server error",
        })
        console.log(error);
    }
}

export const getCurrentUser = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const user = await User.findById(
			req.user.id,
		).select("-password");

		if (!user) {
			res.status(404).json({
				message: "User not found.",
			});
			return;
		}

		res.status(200).json({
			user,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const updateProfile = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { name, email } = req.body;

		const user = await User.findById(req.user.id);

		if (!user) {
			res.status(404).json({
				message: "User not found.",
			});
			return;
		}

		if (email && email !== user.email) {
			const existingUser = await User.findOne({
				email,
			});

			if (existingUser) {
				res.status(400).json({
					message: "Email is already in use.",
				});
				return;
			}
		}

		user.name = name || user.name;
		user.email = email || user.email;

		await user.save();

		res.status(200).json({
			message: "Profile updated successfully.",
			user: {
				_id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const changePassword = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const {
			currentPassword,
			newPassword,
		} = req.body;

		const user = await User.findById(req.user.id).select("+password");

		if (!user) {
			res.status(404).json({
				message: "User not found.",
			});
			return;
		}

		const isMatch = await bcrypt.compare(
			currentPassword,
			user.password,
		);

		if (!isMatch) {
			res.status(401).json({
				message: "Current password is incorrect.",
			});
			return;
		}

		const hashedPassword = await bcrypt.hash(
			newPassword,
			10,
		);

		user.password = hashedPassword;

		await user.save();

		res.status(200).json({
			message: "Password changed successfully.",
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};