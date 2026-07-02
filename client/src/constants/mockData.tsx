import type { PieChartItem } from "../components/charts/PieChartCard";
import type { LineChartItem } from "../components/charts/LineChartCard";

export const MOCK_STATS = [
	{ title: "Current Balance", value: "$12,480", variant: "default" as const },
	{ title: "Income", value: "$5,200", variant: "income" as const },
	{ title: "Expenses", value: "$2,840", variant: "expense" as const },
	{ title: "Savings", value: "$1,360", variant: "savings" as const },
];

export const MOCK_TRANSACTIONS = [
	{
		title: "Salary Deposit",
		category: "Income",
		amount: "$3,200",
		type: "income" as const,
		date: "Mar 1",
	},
	{
		title: "Grocery Store",
		category: "Food",
		amount: "$86.40",
		type: "expense" as const,
		date: "Mar 2",
	},
	{
		title: "Electric Bill",
		category: "Utilities",
		amount: "$124.00",
		type: "expense" as const,
		date: "Mar 3",
	},
	{
		title: "Freelance Payment",
		category: "Income",
		amount: "$900",
		type: "income" as const,
		date: "Mar 4",
	},
];

export const MOCK_PIE_DATA: PieChartItem[] = [
	{ name: "Food", value: 35, color: "#2563eb" },
	{ name: "Rent", value: 30, color: "#16a34a" },
	{ name: "Transport", value: 15, color: "#ca8a04" },
	{ name: "Other", value: 20, color: "#64748b" },
];

export const MOCK_LINE_DATA: LineChartItem[] = [
	{ name: "Jan", amount: 1800 },
	{ name: "Feb", amount: 2200 },
	{ name: "Mar", amount: 1900 },
	{ name: "Apr", amount: 2600 },
	{ name: "May", amount: 2400 },
	{ name: "Jun", amount: 2840 },
];