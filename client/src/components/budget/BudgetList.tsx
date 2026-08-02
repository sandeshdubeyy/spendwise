import { useEffect, useState, type FormEvent } from "react";
import { Card, CardHeader } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { Pencil, Trash } from "lucide-react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { getBudgets, updateBudget, deleteBudget, type Budget, type BudgetInput } from "../../services/budget.services";
import { getCategory, type Category } from "../../services/category.services";

interface BudgetListProps {
    refreshKey?: number;
}

const MONTH_NAMES = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(value);

const getCategoryName = (category: Budget["category"]) =>
    typeof category === "string" ? category : category?.name ?? "—";

const SkeletonRow = () => (
    <tr>
        {Array.from({ length: 4 }).map((_, i) => (
            <td key={i} className="px-4 py-4">
                <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </td>
        ))}
    </tr>
);

const BudgetList = ({ refreshKey = 0 }: BudgetListProps) => {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const MONTH_OPTIONS = [
        { value: 1, label: "January" }, { value: 2, label: "February" },
        { value: 3, label: "March" }, { value: 4, label: "April" },
        { value: 5, label: "May" }, { value: 6, label: "June" },
        { value: 7, label: "July" }, { value: 8, label: "August" },
        { value: 9, label: "September" }, { value: 10, label: "October" },
        { value: 11, label: "November" }, { value: 12, label: "December" },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState<BudgetInput>({
        category: "",
        amount: 0,
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
    });
    const [amountInput, setAmountInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // pull load into its own function so delete/edit can re-call it
    const loadBudgets = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getBudgets();
            setBudgets(data);
        } catch {
            setError("Couldn't load budgets.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBudgets();
    }, [refreshKey]);

    useEffect(() => {
        if (!isModalOpen) return;
        const loadCategories = async () => {
            try {
                const data = await getCategory();
                setCategories(data);
            } catch {
                setCategories([]);
            }
        };
        loadCategories();
    }, [isModalOpen]);

    const openEditModal = (budget: Budget) => {
        setEditingBudget(budget);
        setForm({
            category: typeof budget.category === "string" ? budget.category : budget.category?._id ?? "",
            amount: budget.amount,
            month: budget.month,
            year: budget.year,
        });
        setAmountInput(String(budget.amount));
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (budgetId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this budget?");
        if (!confirmed) return;

        try {
            await deleteBudget(budgetId);
            await loadBudgets();
        } catch {
            window.alert("Couldn't delete the budget. Please try again.");
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (!editingBudget) return;

        const amount = Number(amountInput);
        if (!form.category) {
            setFormError("Please select a category.");
            return;
        }
        if (!Number.isFinite(amount) || amount <= 0) {
            setFormError("Please enter a valid amount.");
            return;
        }

        try {
            setIsSubmitting(true);
            await updateBudget(editingBudget._id, { ...form, amount });
            setIsModalOpen(false);
            setEditingBudget(null);
            await loadBudgets();
        } catch {
            setFormError("Couldn't update the budget. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Card className="mt-6">
                <CardHeader>
                    <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
                        All Budgets
                    </h3>
                </CardHeader>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                        <thead>
                            <tr className={cn("border-b", COLORS.cardBorder)}>
                                <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                    Category
                                </th>
                                <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                    Month
                                </th>
                                <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                    Year
                                </th>
                                <th className={cn("px-4 py-3 text-right text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                    Amount
                                </th>
                                <th className={cn("px-4 py-3 text-right text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : error ? (
                                <tr>
                                    <td colSpan={4} className={cn("px-4 py-8 text-center text-sm", COLORS.danger)}>
                                        {error}
                                    </td>
                                </tr>
                            ) : budgets.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className={cn("px-4 py-8 text-center text-sm", COLORS.textMuted)}>
                                        No budgets yet. Add your first one above.
                                    </td>
                                </tr>
                            ) : (
                                budgets.map((budget) => (
                                    <tr
                                        key={budget._id}
                                        className="transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    >
                                        <td className={cn("px-4 py-4 font-medium capitalize", COLORS.textPrimary)}>
                                            {getCategoryName(budget.category)}
                                        </td>
                                        <td className={cn("px-4 py-4", COLORS.textSecondary)}>
                                            {MONTH_NAMES[budget.month - 1] ?? budget.month}
                                        </td>
                                        <td className={cn("px-4 py-4", COLORS.textSecondary)}>
                                            {budget.year}
                                        </td>
                                        <td className={cn("px-4 py-4 text-right font-medium tabular-nums", COLORS.textPrimary)}>
                                            {formatMoney(budget.amount)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(budget)}
                                                    className="rounded p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                                    aria-label="Edit budget"
                                                >
                                                    <Pencil size={16} className={COLORS.textMuted} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(budget._id)}
                                                    className="rounded p-1.5 transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                                                    aria-label="Delete budget"
                                                >
                                                    <Trash size={16} className="text-red-500" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Budget">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formError ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                            {formError}
                        </div>
                    ) : null}

                    <div className="w-full">
                        <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="edit-budget-category">
                            Category
                        </label>
                        <select
                            id="edit-budget-category"
                            value={form.category}
                            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                            className={cn(
                                "h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200",
                                COLORS.cardBg, COLORS.cardBorder, COLORS.textPrimary, COLORS.focusRing
                            )}
                        >
                            <option value="">Select a category</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Input
                        label="Amount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={amountInput}
                        onChange={(event) => setAmountInput(event.target.value)}
                        required
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="w-full">
                            <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="edit-budget-month">
                                Month
                            </label>
                            <select
                                id="edit-budget-month"
                                value={form.month}
                                onChange={(event) => setForm((prev) => ({ ...prev, month: Number(event.target.value) }))}
                                className={cn(
                                    "h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200",
                                    COLORS.cardBg, COLORS.cardBorder, COLORS.textPrimary, COLORS.focusRing
                                )}
                            >
                                {MONTH_OPTIONS.map((month) => (
                                    <option key={month.value} value={month.value}>
                                        {month.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label="Year"
                            type="number"
                            min="2000"
                            max="2100"
                            value={String(form.year)}
                            onChange={(event) => setForm((prev) => ({ ...prev, year: Number(event.target.value) }))}
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isSubmitting}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default BudgetList;