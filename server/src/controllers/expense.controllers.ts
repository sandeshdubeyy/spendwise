import { Request,Response } from "express";

import Expense from "../models/Expense.models";
import { queryObjects } from "node:v8";
import { Query } from "mongoose";

export const createExpense = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const expense = await Expense.create(req.body);

        res.status(201).json({
            message: "Expense created successfully",
            expense,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Server error",
        })
    }
}

export const getExpenses = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string;
        const category = req.query.category as string;
        const type = req.query.type  as string;
        const paymentMethod = req.query.paymentMethod as string;

        const query: any = { user };

        if(category){
            query.category = category;
        };

        if(type){
            query.type = type;
        };

        if(paymentMethod){
            query.paymentMethod = paymentMethod;
        };

        const expenses = await Expense.find(
            query,
        ).populate("category").sort({date:-1});

        res.status(200).json({
            expenses,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const getExpenseById = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const expense = await Expense.findById(
            req.params.id,
        ).populate("category");

        if(!expense){
            res.status(404).json({
                message:"Expense not found",
            });
            return;
        };

        res.status(200).json({
            expense,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const updateExpense = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true},
        );

        if(!expense){
            res.status(404).json({
                message:"Expense not found",
            });
            return;
        };

        res.status(200).json({
            message:"Expense updated successfully",
            expense,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const deleteExpense = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const expense = await Expense.findByIdAndDelete(
            req.params.id,
        );

        if(!expense){
            res.status(404).json({
                message:"Expense not found",
            });
            return;
        };

        res.status(200).json({
            message:"Expense deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}