import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { Card } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

const AddExpensePrompt = () => {
    return (
        <Card className="mt-6 overflow-hidden border border-green-100/80 bg-gradient-to-r from-white to-green-50/70 p-0 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.35)] dark:border-blue-800/60 dark:from-slate-900 dark:to-blue-950/40">
            <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-2">
                    <div>
                        <h3 className={cn("text-lg font-semibold", COLORS.textPrimary)}>
                            Want to log a new expense?
                        </h3>
                        <p className={cn("mt-1 text-sm leading-6", COLORS.textSecondary)}>
                            Add a new expense in seconds and keep your spending records up to date.
                        </p>
                    </div>
                </div>

                <Link
                    to="/expenses"
                    className={cn(
                        "inline-flex items-center justify-center rounded-lg px-5 py-3 text-sm font-medium text-white transition-colors",
                        COLORS.primaryBtn
                    )}
                >
                    Add Expense
                </Link>
            </div>
        </Card>
    );
};

export default AddExpensePrompt;