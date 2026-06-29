import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

////jwt update done on 29 june 2026
export const authMiddleware = (
    req:Request,
    res:Response,
    next:NextFunction,
) : void => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith("Bearer ")){
            res.status(401).json({
                message:"Access denied. No token provided.",
            })
            return;
        }
        const token = authHeader.split(" ")[1];
        
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string,
        );
        
        req.user = decoded as {
            id: string,
        };

        next();
    } catch (error) {
        res.status(401).json({
            message:"Invalid or expired token.",
        })
    }
};