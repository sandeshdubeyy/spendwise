import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { getBudgetVsActual } from "../../services/analytics.services";

interface BudgetVsActualItem {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
  status: "within_budget" | "over_budget";
  month: number;
  year: number;
}

const formatMoney = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(value);

const BudgetVsActualCard = () => {
  const [data, setData] = useState<BudgetVsActualItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await getBudgetVsActual();
        setData(result);
      } catch {
        setError("Couldn't load budget vs actual data.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Compare Budget With Actual Spending</h3>
        </CardHeader>
        <CardBody>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            ))}
          </div>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Compare Budget With Actual Spending</h3>
        </CardHeader>
        <CardBody>
          <p className={cn("text-sm", COLORS.danger)}>{error}</p>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Compare Budget With Actual Spending</h3>
      </CardHeader>

      <CardBody>
        <div className="space-y-4">
          {data.map((item) => {
            const percent = item.budget > 0 ? Math.min((item.spent / item.budget) * 100, 100) : 0;
            const isOver = item.status === "over_budget";

            return (
              <div key={`${item.category}-${item.month}-${item.year}`} className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={cn("text-sm font-medium", COLORS.textPrimary)}>{item.category}</p>
                    <p className={cn("text-xs", COLORS.textSecondary)}>
                      Budget {formatMoney(item.budget)} · Spent {formatMoney(item.spent)}
                    </p>
                  </div>

                  <span className={cn("text-sm font-semibold", isOver ? COLORS.expense : COLORS.income)}>
                    {isOver ? "Over budget" : "Within budget"}
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                  <div
                    className={cn(
                      "h-full rounded-full transition-all",
                      isOver ? "bg-rose-500" : "bg-emerald-500"
                    )}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className={cn("", COLORS.textMuted)}>
                    Remaining {formatMoney(item.remaining)}
                  </span>
                  <span className={cn("font-medium", isOver ? COLORS.expense : COLORS.income)}>
                    {Math.round(percent)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardBody>
    </Card>
  );
};

export default BudgetVsActualCard;