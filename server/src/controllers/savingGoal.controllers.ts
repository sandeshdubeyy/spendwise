import { Request, Response } from "express";
import mongoose from "mongoose";
import SavingsGoal from "../models/SavingsGoal.models";

export const createSavingGoal = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const { title, targetAmount, currentAmount, deadline, user } = req.body;

        const existingGoal = await SavingsGoal.findOne({
            user,
            title
        });

        if (existingGoal) {
            res.status(400).json({
                message: "A savings goal with this name already exists.",
            });
            return;
        }

        const category = await SavingsGoal.create({
            title,
            targetAmount,
            currentAmount: currentAmount || 0,
            deadline,
            user
        });

        res.status(201).json({
            message: "Savings goal created successfully",
            category
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    };
};

export const getSavingsGoals = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.query.user as string;

        const goals = await SavingsGoal.find({
            user,
        }).sort({
            createdAt: -1,
        });

        res.status(200).json({
            goals,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getSavingGoalById = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const goal = await SavingsGoal.findById(
            req.params.id,
        );

        if(!goal){
            res.status(404).json({
                message:"Saving Goal not found",
            });
            return;
        };

        res.status(200).json({
            goal,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const updateSavingsGoal = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const { id } = req.params;

		const {
			title,
			targetAmount,
			currentAmount,
			deadline,
		} = req.body;

		const goal = await SavingsGoal.findById(id);

		if (!goal) {
			res.status(404).json({
				message: "Savings goal not found.",
			});
			return;
		}

		const existingGoal = await SavingsGoal.findOne({
			_id: { $ne: id },
			user: goal.user,
			title,
		});

		if (existingGoal) {
			res.status(400).json({
				message: "A savings goal with this title already exists.",
			});
			return;
		}

		const updatedGoal = await SavingsGoal.findByIdAndUpdate(
			id,
			{
				title,
				targetAmount,
				currentAmount,
				deadline,
			},
			{
				new: true,
				runValidators: true,
			},
		);

		res.status(200).json({
			message: "Savings goal updated successfully.",
			goal: updatedGoal,
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};

export const deleteSavingsGoal = async (
	req: Request,
	res: Response,
): Promise<void> => {
	try {
		const goal = await SavingsGoal.findByIdAndDelete(
			req.params.id,
		);

		if (!goal) {
			res.status(404).json({
				message: "Savings goal not found.",
			});
			return;
		}

		res.status(200).json({
			message: "Savings goal deleted successfully.",
		});
	} catch (error) {
		console.log(error);

		res.status(500).json({
			message: "Server Error",
		});
	}
};