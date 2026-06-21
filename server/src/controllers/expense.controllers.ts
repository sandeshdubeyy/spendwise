import { Request,Response } from "express";
import mongoose from "mongoose";

import Expense from "../models/Expense.models";
import { queryObjects } from "node:v8";
import { Query } from "mongoose";
import Budget from "../models/Budget.models";

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
        const startDate = req.query.startDate as string;
        const endDate = req.query.endDate as string;

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

        if (startDate || endDate) {
            query.date = {};

            if (startDate) {
                query.date.$gte = new Date(startDate as string);
            }

            if (endDate) {
                query.date.$lte = new Date(endDate as string);
            }
        }

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

export const getTotalIncome = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string;

        const result = await Expense.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(user as string),
                    type:"income",
                },
            },
            {
                $group:{
                    _id:null,
                    totalIncome:{
                        $sum:"$amount",
                    },
                },
            },
        ]);

        res.status(200).json({
            totalIncome:result[0]?.totalIncome || 0   
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const getTotalExpense = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string;

        const result = await Expense.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(user as string),
                    type:"expense",
                },
            },
            {
                $group:{
                    _id:null,
                    totalExpense:{
                        $sum:"$amount",
                    },
                },
            },
        ]);

        res.status(200).json({
            totalExpense:result[0]?.totalExpense || 0   
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const getCurrentBalance = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string;

        const result = await Expense.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(user as string),
                },
            },
            {
                $group:{
                    _id:null,

                    totalIncome:{
                        $sum:{
                            $cond:[
                                {$eq:["$type","income"]},
                                "$amount",
                                0,
                            ]
                        },
                    },
                    
                    totalExpense:{
                        $sum:{
                            $cond:[
                                {$eq:["$type","expense"]},
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
            message:"Server Error",
        })
    }
}

export const getTransactionCount = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string

        const count = await Expense.countDocuments({
            user,
        })

        res.status(200).json({
            transactionCount:count,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const getDashboardSummary = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string

        const transactionCount = await Expense.countDocuments({
            user,
        })

        const result = await Expense.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(user as string),
                },
            },
            {
                $group:{
                    _id:null,

                    totalIncome:{
                        $sum:{
                            $cond:[
                                {$eq:["$type","income"]},
                                "$amount",
                                0,
                            ]
                        },
                    },
                    
                    totalExpense:{
                        $sum:{
                            $cond:[
                                {$eq:["$type","expense"]},
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
            message:"Server Error",
        })
    }
}

export const getRecentTransactions = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string

        const recent = await Expense.find({
            user,
        })
        .populate("category")
        .sort({date:-1})
        .limit(5)

        res.status(200).json({
            recentTransaction:recent,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const getCategoryWiseSpending = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string

        const spending = await Expense.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(user),
                    type:"expense",
                },
            },
            {
                $group:{
                    _id:"$category",
                    totalSpent:{
                        $sum: "$amount",
                    },
                },
            },
            {
                $lookup:{
                    from:"categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind:"$category",
            },
            {
                $project:{
                    _id:0,
                    category:"$category.name",
                    totalSpent:1,
                },
            },
        ]);
        
        console.log(spending);
        res.status(200).json({
            spending,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const getMonthlySpendingTrend = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string

        const trend = await Expense.aggregate([
            {
                $match:{
                    user: new mongoose.Types.ObjectId(user),
                    type:"expense",
                },
            },
            {
                $group:{
                    _id:{
                        year:{$year:"$date"},
                        month:{$month:"$date"},
                    },
                    totalSpent:{
                        $sum:"$amount",
                    },
                },
            },
            {
                $sort:{
                    "_id.year":1,
                    "_id.month":1,
                },
            },
            {
                $project:{
                    _id:0,
                    month:{
                        $concat:[
                            {$toString:"$_id.year"},
                            "-",
                            {$toString:"$_id.month"},
                        ]
                    },
                    totalSpent:1,
                },
            },
        ]);

        res.status(200).json({
            trend,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}

export const getBudgetVsActual = async (
    req:Request,
    res:Response,
) : Promise<void> => {
    try {
        const user = req.query.user as string
        
        const budgets = await Budget.find({
            user,
        }).populate("category");
        
        const analytics : Array<Object> = [];

        for(const budget of budgets )
        {
            const spent = await Expense.aggregate([
                {
                    $match:{
                        user: new mongoose.Types.ObjectId(user),
                        category: budget.category._id,
                        type:"expense",

                        $expr:{
                            $and:[
                                {
                                    $eq:[
                                        {$month:"$date"},
                                        budget.month,
                                    ],
                                },
                                {
                                    $eq: [
                                        { $year: "$date" },
                                        budget.year,
                                    ],
                                },
                            ],
                        },
                    },
                },
                {
                    $group:{
                        _id:null,
                        totalSpent:{
                            $sum:"$amount",
                        },
                    },
                },
            ]);
            const totalSpent=spent[0]?.totalSpent || 0;

            const remaining = budget.amount - totalSpent;

            analytics.push({
                category:(budget.category as any).name,
                budget:budget.amount,
                spent:totalSpent,
                remaining,
                status: remaining >= 0 ? "within_budget" : "over_budget",
                month:budget.month,
                year:budget.year
            })
        }
        
        res.status(200).json({
            analytics,
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message:"Server Error",
        })
    }
}