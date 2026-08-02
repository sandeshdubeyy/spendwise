import { useEffect, useState } from "react";
import { Card,CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getRecentTransactions,type Expense } from "../../services/expense.services";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

const formatMoney = (value:number) => 
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(value);

const paymentMethodLabel: Record<string, string> = {
  upi: "UPI",
  cash: "Cash",
  bank_transfer: "Bank Transfer",
  card: "Card",
};

const getCategoryName = (category: Expense["category"]) =>
  typeof category === "string" ? category : category?.name ?? "—";

const SkeletonRow = () => (
  <tr>
    {Array.from({ length: 6 }).map((_, i) => (
      <td key={i} className="px-4 py-4">
        <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
      </td>
    ))}
  </tr>
);

const RecentTransactionsTable = () => {
  const [transactions, setTransactions] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getRecentTransactions();
        setTransactions(data);
      } catch {
        setError("Couldn't load recent transactions.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);
  return (
    <Card className="mt-6">
      <CardHeader>
        <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
          Recent Transactions
        </h3>
      </CardHeader>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left text-sm">
          <thead>
            <tr
              className={cn(
                "border-b",
                COLORS.cardBorder
              )}
            >
              <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                Title
              </th>
              <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                Category
              </th>
              <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                Type
              </th>
              <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                Payment Method
              </th>
              <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                Date
              </th>
              <th className={cn("px-4 py-3 text-right text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                Amount
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : error ? (
              <tr>
                <td colSpan={6} className={cn("px-4 py-8 text-center text-sm", COLORS.danger)}>
                  {error}
                </td>
              </tr>
            ) : transactions.length === 0 ? (
              <tr>
                <td colSpan={6} className={cn("px-4 py-8 text-center text-sm", COLORS.textMuted)}>
                  No transactions yet. Add your first one to see it here.
                </td>
              </tr>
            ) : (
              transactions.map((txn) => (
                <tr
                  key={txn._id}
                  className="transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                >
                  <td className={cn("px-4 py-4 font-medium", COLORS.textPrimary)}>
                    {txn.title}
                  </td>
                  <td className={cn("px-4 py-4", COLORS.textSecondary)}>
                    {getCategoryName(txn.category)}
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={cn(
                        "capitalize",
                        txn.type === "income" ? COLORS.income : COLORS.expense
                      )}
                    >
                      {txn.type}
                    </span>
                  </td>
                  <td className={cn("px-4 py-4", COLORS.textSecondary)}>
                    {paymentMethodLabel[txn.paymentMethod] ?? txn.paymentMethod}
                  </td>
                  <td className={cn("px-4 py-4", COLORS.textSecondary)}>
                    {formatDate(txn.date)}
                  </td>
                  <td
                    className={cn(
                      "px-4 py-4 text-right font-medium tabular-nums",
                      txn.type === "income" ? COLORS.income : COLORS.expense
                    )}
                  >
                    {txn.type === "income" ? "+" : "-"}
                    {formatMoney(txn.amount)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default RecentTransactionsTable;
