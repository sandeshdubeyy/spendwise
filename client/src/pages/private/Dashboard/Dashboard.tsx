import { useEffect, useState } from "react";
import { Card } from "../../../components/common/Card";
import Spinner from "../../../components/common/Spinner";
import RecentTransactionsTable from "../../../components/dashboard/RecentTransactionsTable";
import AddExpensePrompt from "../../../components/dashboard/AddExpensePrompt";
import MonthlyTrendChart from "../../../components/dashboard/MonthlyTrendChart";
import CategorySpendingChart from "../../../components/dashboard/CategorySpendingChart";
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

const Dashboard = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch {
        setError("Couldn't load your dashboard. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  return (
    <>
      <div className="mb-6">
        <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Dashboard</h1>
        <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
          Overview of your finances.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" className={COLORS.textBrand} />
        </div>
      ) : error ? (
        <p className={COLORS.danger}>{error}</p>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="p-6">
              <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Balance</h3>
              <div className={cn("mt-3 text-2xl font-bold", COLORS.textPrimary)}>
                {formatMoney(summary!.currentBalance)}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Income</h3>
              <div className={cn("mt-3 text-2xl font-bold", COLORS.income)}>
                {formatMoney(summary!.totalIncome)}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className={cn("text-sm font-semibold", COLORS.textSecondary)}>Expenses</h3>
              <div className={cn("mt-3 text-2xl font-bold", COLORS.expense)}>
                {formatMoney(summary!.totalExpense)}
              </div>
            </Card>
          </div>

          <RecentTransactionsTable />

          <AddExpensePrompt />

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.75fr_1.25fr]">
            <div className="min-w-0">
              <MonthlyTrendChart />
            </div>

            <div className="min-w-0">
              <CategorySpendingChart />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dashboard;