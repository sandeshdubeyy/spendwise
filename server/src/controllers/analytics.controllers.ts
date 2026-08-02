import { Request, Response } from "express";
import mongoose from "mongoose";

import Expense from "../models/Expense.models";
import Budget from "../models/Budget.models";
import { getIndianHolidays } from "../data/indianHolidays";

// ===================== MOVED FROM expense.controllers.ts =====================

export const getCategoryWiseSpending = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const spending = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: "$category",
                    totalSpent: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $lookup: {
                    from: "categories",
                    localField: "_id",
                    foreignField: "_id",
                    as: "category",
                },
            },
            {
                $unwind: "$category",
            },
            {
                $project: {
                    _id: 0,
                    category: "$category.name",
                    totalSpent: 1,
                },
            },
        ]);

        res.status(200).json({
            spending,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getMonthlySpendingTrend = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const trend = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                    },
                    totalSpent: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
            {
                $project: {
                    _id: 0,
                    month: {
                        $concat: [
                            { $toString: "$_id.year" },
                            "-",
                            { $toString: "$_id.month" },
                        ]
                    },
                    totalSpent: 1,
                },
            },
        ]);

        res.status(200).json({
            trend,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

export const getBudgetVsActual = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const budgets = await Budget.find({
            user,
        }).populate("category");

        const analytics: Array<Object> = [];

        for (const budget of budgets) {
            const spent = await Expense.aggregate([
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(user),
                        category: budget.category._id,
                        type: "expense",

                        $expr: {
                            $and: [
                                {
                                    $eq: [
                                        { $month: "$date" },
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
                    $group: {
                        _id: null,
                        totalSpent: {
                            $sum: "$amount",
                        },
                    },
                },
            ]);
            const totalSpent = spent[0]?.totalSpent || 0;

            const remaining = budget.amount - totalSpent;

            analytics.push({
                category: (budget.category as any).name,
                budget: budget.amount,
                spent: totalSpent,
                remaining,
                status: remaining >= 0 ? "within_budget" : "over_budget",
                month: budget.month,
                year: budget.year,
            });
        }

        res.status(200).json({
            analytics,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// ===================== NEW ANALYTICS =====================

// 1. Payment method breakdown — pie chart of spend by upi/cash/card/bank_transfer
export const getPaymentMethodBreakdown = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const breakdown = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: "$paymentMethod",
                    totalSpent: {
                        $sum: "$amount",
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    paymentMethod: "$_id",
                    totalSpent: 1,
                },
            },
            {
                $sort: {
                    totalSpent: -1,
                },
            },
        ]);

        res.status(200).json({
            breakdown,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// 2. Savings rate trend — (income - expense) / income * 100, per month
export const getSavingsRateTrend = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const monthly = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: "$date" },
                        month: { $month: "$date" },
                    },
                    totalIncome: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "income"] }, "$amount", 0],
                        },
                    },
                    totalExpense: {
                        $sum: {
                            $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0],
                        },
                    },
                },
            },
            {
                $sort: {
                    "_id.year": 1,
                    "_id.month": 1,
                },
            },
        ]);

        const trend = monthly.map((item) => {
            const totalIncome = item.totalIncome || 0;
            const totalExpense = item.totalExpense || 0;
            const savingsRate =
                totalIncome > 0
                    ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100)
                    : 0;

            return {
                month: `${item._id.year}-${item._id.month}`,
                totalIncome,
                totalExpense,
                savingsRate,
            };
        });

        res.status(200).json({
            trend,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// 3. Month-over-month category change — this month vs last month, per category
export const getCategoryMonthOverMonth = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

        const aggregateForMonth = async (month: number, year: number) => {
            return Expense.aggregate([
                {
                    $match: {
                        user: new mongoose.Types.ObjectId(user),
                        type: "expense",
                        $expr: {
                            $and: [
                                { $eq: [{ $month: "$date" }, month] },
                                { $eq: [{ $year: "$date" }, year] },
                            ],
                        },
                    },
                },
                {
                    $group: {
                        _id: "$category",
                        totalSpent: { $sum: "$amount" },
                    },
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "_id",
                        foreignField: "_id",
                        as: "category",
                    },
                },
                {
                    $unwind: "$category",
                },
                {
                    $project: {
                        _id: 0,
                        categoryId: "$category._id",
                        category: "$category.name",
                        totalSpent: 1,
                    },
                },
            ]);
        };

        const [currentData, previousData] = await Promise.all([
            aggregateForMonth(currentMonth, currentYear),
            aggregateForMonth(previousMonth, previousYear),
        ]);

        const previousMap = new Map(
            previousData.map((item) => [String(item.categoryId), item.totalSpent]),
        );

        const comparison = currentData.map((item) => {
            const previousSpent = previousMap.get(String(item.categoryId)) || 0;
            const currentSpent = item.totalSpent;

            let percentageChange = 0;
            if (previousSpent > 0) {
                percentageChange = Math.round(
                    ((currentSpent - previousSpent) / previousSpent) * 100,
                );
            } else if (currentSpent > 0) {
                percentageChange = 100;
            }

            return {
                category: item.category,
                currentSpent,
                previousSpent,
                percentageChange,
            };
        });

        res.status(200).json({
            comparison,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// 4. Spending calendar heatmap — total spent per day, last 365 days
export const getSpendingHeatmap = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const oneYearAgo = new Date();
        oneYearAgo.setDate(oneYearAgo.getDate() - 365);

        const heatmap = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                    type: "expense",
                    date: { $gte: oneYearAgo },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    totalSpent: { $sum: "$amount" },
                    transactionCount: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    date: "$_id",
                    totalSpent: 1,
                    transactionCount: 1,
                },
            },
            {
                $sort: { date: 1 },
            },
        ]);

        res.status(200).json({
            heatmap,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// 5. Weekday vs weekend spending ratio
export const getWeekdayVsWeekendSpending = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;

        const dailyTotals = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                    type: "expense",
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    totalSpent: { $sum: "$amount" },
                },
            },
        ]);

        let totalWeekdaySpent = 0;
        let totalWeekendSpent = 0;
        let weekdayCount = 0;
        let weekendCount = 0;

        dailyTotals.forEach((day) => {
            const dayOfWeek = new Date(day._id).getDay(); // 0 = Sunday, 6 = Saturday
            const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

            if (isWeekend) {
                totalWeekendSpent += day.totalSpent;
                weekendCount += 1;
            } else {
                totalWeekdaySpent += day.totalSpent;
                weekdayCount += 1;
            }
        });

        const weekdayAvgPerDay = weekdayCount > 0 ? totalWeekdaySpent / weekdayCount : 0;
        const weekendAvgPerDay = weekendCount > 0 ? totalWeekendSpent / weekendCount : 0;

        const ratio =
            weekdayAvgPerDay > 0
                ? Number((weekendAvgPerDay / weekdayAvgPerDay).toFixed(2))
                : 0;

        res.status(200).json({
            totalWeekdaySpent,
            totalWeekendSpent,
            weekdayAvgPerDay: Math.round(weekdayAvgPerDay),
            weekendAvgPerDay: Math.round(weekendAvgPerDay),
            ratio, // e.g. 1.4 means you spend 1.4x more per weekend day than per weekday
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};

// 6. Holiday spending comparison — uses a free, no-key public holiday API
export const getHolidaySpendingComparison = async (
    req: Request,
    res: Response,
): Promise<void> => {
    try {
        const user = req.user.id;
        const year = Number(req.query.year) || new Date().getFullYear();
        const countryCode = (req.query.countryCode as string) || "US";

        let holidayDates: Set<string>;

        if (countryCode === "IN") {
            // Nager.Date doesn't cover India — use our own static list instead.
            const holidays = getIndianHolidays(year);
            holidayDates = new Set(holidays.map((h) => h.date));
        } else {
            const holidayResponse = await fetch(
                `https://date.nager.at/api/v3/PublicHolidays/${year}/${countryCode}`,
            );

            if (!holidayResponse.ok) {
                res.status(502).json({
                    message: "Couldn't fetch holiday data. Try a different country code.",
                });
                return;
            }

            const holidays = (await holidayResponse.json()) as { date: string; }[];
            holidayDates = new Set(holidays.map((h) => h.date));
        }

        const dailyTotals = await Expense.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(user),
                    type: "expense",
                    date: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dateToString: { format: "%Y-%m-%d", date: "$date" },
                    },
                    totalSpent: { $sum: "$amount" },
                },
            },
        ]);

        let totalHolidaySpent = 0;
        let totalNonHolidaySpent = 0;
        let holidayCount = 0;
        let nonHolidayCount = 0;

        dailyTotals.forEach((day) => {
            if (holidayDates.has(day._id)) {
                totalHolidaySpent += day.totalSpent;
                holidayCount += 1;
            } else {
                totalNonHolidaySpent += day.totalSpent;
                nonHolidayCount += 1;
            }
        });

        const holidayAvgPerDay = holidayCount > 0 ? totalHolidaySpent / holidayCount : 0;
        const nonHolidayAvgPerDay =
            nonHolidayCount > 0 ? totalNonHolidaySpent / nonHolidayCount : 0;

        res.status(200).json({
            year,
            countryCode,
            holidayAvgPerDay: Math.round(holidayAvgPerDay),
            nonHolidayAvgPerDay: Math.round(nonHolidayAvgPerDay),
            holidaysWithSpending: holidayCount,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server Error",
        });
    }
};