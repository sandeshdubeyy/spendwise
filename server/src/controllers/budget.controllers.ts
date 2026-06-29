import { Request,Response } from "express";
import mongoose from "mongoose";

import Budget from "../models/Budget.models";

//jwt update done
//all functions are tested and working 29 june 2026

export const createBudget = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const {
			category, amount, month, year
		} = req.body;
		const user = req.user.id;
		const existingBudget = await Budget.findOne({
			user,
			category,
			month,
			year,
		});

		if (existingBudget) {
			res.status(400).json({
				message: "Budget already exists for this category and month.",
			});
			return;
		}

		const budget = await Budget.create({
			category,
			amount,
			month,
			year,	
			user,
		});

		res.status(201).json({
			message: "Budget created successfully.",
			budget,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const getBudgets = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.user.id;
        const month = req.query.month as string;
        const year = req.query.year  as string;

        const query: any = { user };

        if(month){
            query.month = Number(month);
        };

        if(year){
            query.year = Number(year);
        };

        const budgets = await Budget.find(
            query,
        ).populate("category");

        res.status(200).json({
            budgets,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const getBudgetById = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;

		const budget = await Budget.findById(id).populate("category");

		if (!budget) {
			res.status(404).json({
				message: "Budget not found.",
			});
			return;
		}

		res.status(200).json({
			budget,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const updateBudget = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { id } = req.params;

		const {
			category,
			amount,
			month,
			year,
		} = req.body;
		
		const budget = await Budget.findOne({
			_id: id
		});
		console.log(budget);
		if (!budget) {
			res.status(404).json({
				message: "Budget not found.",
			});
			return;
		}

		const duplicateBudget = await Budget.findOne({
			_id: { $ne: id },
			user: budget.user,
			category,
			month,
			year,
		});

		if (duplicateBudget) {
			res.status(400).json({
				message: "Budget already exists for this category and month.",
			});
			return;
		}

		const updatedBudget = await Budget.findByIdAndUpdate(
			id,
			{
				category,
				amount,
				month,
				year,
			},
			{
				new: true,
				runValidators: true,
			}
		).populate("category");

		res.status(200).json({
			message: "Budget updated successfully.",
			budget: updatedBudget,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const deleteBudget = async (
	req:Request,
	res:Response,
) : Promise<void> => {
	try {
		const budget = await Budget.findByIdAndDelete(
			req.params.id,
		);

		if(!budget){
			res.status(404).json({
				message:"Budget not found",
			});
			return;
		};

		res.status(200).json({
			message:"Budget deleted successfully",
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message:"Server Error",
		})
	}
}