import { useState } from "react";
import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import { BudgetProvider } from "../../../context/Budget.context";
import BudgetSummaryCards from "../../../components/budget/BudgetSummaryCards";
import AddBudgetPrompt from "../../../components/budget/AddBudgetPrompt";
import BudgetList from "../../../components/budget/BudgetList";

const BudgetsContent = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <>
            <div className="mb-6">
                <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Budgets</h1>
                <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
                    Set and track monthly budgets for your categories.
                </p>
            </div>

            <BudgetSummaryCards />

            <AddBudgetPrompt onSuccess={() => setRefreshKey((prev) => prev + 1)} />

            <BudgetList refreshKey={refreshKey} />
        </>
    );
};

const Budgets = () => {
    return (
        <BudgetProvider>
            <BudgetsContent />
        </BudgetProvider>
    );
};

export default Budgets;