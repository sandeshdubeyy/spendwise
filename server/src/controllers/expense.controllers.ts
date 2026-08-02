import { Request, Response } from "express";
import mongoose from "mongoose";

import Expense from "../models/Expense.models";

//jwt update done
//all functions are tested and working 29 june 2026

export const createExpense = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const expense = await Expense.create({
            ...req.body,
            user: req.user.id,
        });

        res.status(201).json({
            message: "Expense created successfully",
            expense,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};

export const getExpenses = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;
        const { search, type } = req.query;

        const matchStage: any = {
            user: new mongoose.Types.ObjectId(user as string),
        };

        if (type === "income" || type === "expense") {
            matchStage.type = type;
        }

        // No search term — return normally, populated, sorted by newest first
        if (!search || typeof search !== "string" || !search.trim()) {
            const expenses = await Expense.find(matchStage)
                .populate("category")
                .sort({ date: -1 });

            res.status(200).json({
                expenses,
            });
            return;
        }

        const searchRegex = new RegExp(search.trim(), "i");

        // Aggregation needed because we're matching against the populated
        // category's name too, not just the expense's own fields.
        const expenses = await Expense.aggregate([
            {
                $match: matchStage,
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "category",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: "$category",
            },
            {
                $match: {
                    $or: [
                        { title: searchRegex },
                        { "category.name": searchRegex },
                        { paymentMethod: searchRegex },
                    ],
                },
            },
            {
                $sort: {
                    date: -1,
                },
            },
        ]);

        res.status(200).json({
            expenses,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getExpenseById = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const expense = await Expense.findById(
            req.params.id,
        ).populate("category");

        if (!expense) {
            res.status(404).json({
                message: "Expense not found",
            });
            return;
        };

        res.status(200).json({
            expense,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const updateExpense = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );

        if (!expense) {
            res.status(404).json({
                message: "Expense not found",
            });
            return;
        };

        res.status(200).json({
            message: "Expense updated successfully",
            expense,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const deleteExpense = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const expense = await Expense.findByIdAndDelete(
            req.params.id,
        );

        if (!expense) {
            res.status(404).json({
                message: "Expense not found",
            });
            return;
        };

        res.status(200).json({
            message: "Expense deleted successfully",
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getTotalIncome = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const result = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user as string),
                    type: "income",
                },
            },
            {
                $group: {
                    _id: null,
                    totalIncome: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        res.status(200).json({
            totalIncome: result[0]?.totalIncome || 0
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getTotalExpense = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const result = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user as string),
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: null,
                    totalExpense: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        res.status(200).json({
            totalExpense: result[0]?.totalExpense || 0
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getCurrentBalance = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const result = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user as string),
                },
            },
            {
                $group: {
                    _id: null,

                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0,
                            ]
                        },
                    },

                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0,
                            ]
                        }
                    }
                },
            },
        ]);

        const totalIncome = result[0]?.totalIncome || 0;
        const totalExpense = result[0]?.totalExpense || 0;

        const currentBalance = totalIncome - totalExpense;

        res.status(200).json({
            currentBalance,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getTransactionCount = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const count = await Expense.countDocuments({
            user,
        });

        res.status(200).json({
            transactionCount: count,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getDashboardSummary = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const transactionCount = await Expense.countDocuments({
            user,
        });

        const result = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user as string),
                },
            },
            {
                $group: {
                    _id: null,

                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0,
                            ]
                        },
                    },

                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0,
                            ]
                        }
                    }
                },
            },
        ]);

        const totalIncome = result[0]?.totalIncome || 0;
        const totalExpense = result[0]?.totalExpense || 0;

        const currentBalance = totalIncome - totalExpense;

        res.status(200).json({
            transactionCount,
            totalIncome,
            totalExpense,
            currentBalance
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getRecentTransactions = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const recent = await Expense.find({
            user,
        })
            .populate("category")
            .sort({ date: -1 })
            .limit(5);

        res.status(200).json({
            recentTransaction: recent,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getCurrentMonthSummary = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const monthMatch = {
            $expr: {
                $and: [
                    { $eq: [{ $month: "$date" }, currentMonth] },
                    { $eq: [{ $year: "$date" }, currentYear] },
                ],
            },
        };

        const transactionCount = await Expense.countDocuments({
            user,
            ...monthMatch,
        });

        const result = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user as string),
                    ...monthMatch,
                },
            },
            {
                $group: {
                    _id: null,

                    totalIncome: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "income"] },
                                "$amount",
                                0,
                            ]
                        },
                    },

                    totalExpense: {
                        $sum: {
                            $cond: [
                                { $eq: ["$type", "expense"] },
                                "$amount",
                                0,
                            ]
                        }
                    }
                },
            },
        ]);

        const totalIncome = result[0]?.totalIncome || 0;
        const totalExpense = result[0]?.totalExpense || 0;

        const currentBalance = totalIncome - totalExpense;

        res.status(200).json({
            transactionCount,
            totalIncome,
            totalExpense,
            currentBalance
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};