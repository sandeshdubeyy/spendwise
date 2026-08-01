import { useState } from "react";
import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import AddSavingGoalPrompt from "../../../components/savingGoal/AddSavingGoalPrompt";
import SavingGoalList from "../../../components/savingGoal/SavingGoalList";

const SavingsGoals = () => {
    const [refreshKey, setRefreshKey] = useState(0);

    return (
        <>
            <div className="mb-6">
                <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Savings Goals</h1>
                <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
                    Set goals and track your progress toward them.
                </p>
            </div>

            <AddSavingGoalPrompt onSuccess={() => setRefreshKey((prev) => prev + 1)} />

            <SavingGoalList refreshKey={refreshKey} />
        </>
    );
};

export default SavingsGoals;