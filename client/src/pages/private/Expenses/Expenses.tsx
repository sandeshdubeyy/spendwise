import { useEffect, useState } from "react";
import { Card } from "../../../components/common/Card";
import Spinner from "../../../components/common/Spinner";
import AddExpenseButton from "../../../components/expense/AddExpenseButton";
import ExpenseSearchBar from "../../../components/expense/ExpenseSearchBar";
import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import { getDashboardSummary } from "../../../services/expense.services";

interface Summary {
    transactionCount: number;
    totalIncome: number;
    totalExpense: number;
    currentBalance: number;
}

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

const Expenses = () => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        const load = async () => {
            try {
                setLoading(true);
                const data = await getDashboardSummary();
                setSummary(data);
            } catch {
                setError("Couldn't load expense summary.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, [refreshKey]);

    return (
        <>
            <div className="mb-6">
                <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Expenses</h1>
                <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
                    Track and manage your transactions in one place.
                </p>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Spinner size="lg" className={COLORS.textBrand} />
                </div>
            ) : error ? (
                <p className={cn("text-sm", COLORS.danger)}>{error}</p>
            ) : (
                <>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        <Card className="p-6">
                            <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Balance</h3>
                            <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>
                                {formatMoney(summary!.currentBalance)}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Expenses</h3>
                            <div className={cn("mt-3 text-2xl font-bold", COLORS.expense)}>
                                {formatMoney(summary!.totalExpense)}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Income</h3>
                            <div className={cn("mt-3 text-2xl font-bold", COLORS.income)}>
                                {formatMoney(summary!.totalIncome)}
                            </div>
                        </Card>

                        <Card className="p-6">
                            <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Transactions</h3>
                            <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>
                                {summary!.transactionCount}
                            </div>
                        </Card>
                    </div>

                    <div className="mt-6">
                        <ExpenseSearchBar />
                    </div>

                    <AddExpenseButton onSuccess={() => setRefreshKey((prev) => prev + 1)} />
                </>
            )}
        </>
    );
};

export default Expenses;