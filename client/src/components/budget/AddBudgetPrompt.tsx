import { useEffect, useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import PromptCard from "../common/PromptCard";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { createBudget, type BudgetInput } from "../../services/budget.services";
import { getCategory, type Category } from "../../services/category.services";
import { useBudget } from "../../context/Budget.context";

interface AddBudgetPromptProps {
    onSuccess?: () => void;
}

const MONTH_OPTIONS = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
];

const AddBudgetPrompt = ({ onSuccess }: AddBudgetPromptProps) => {
    const { refreshBudgetSummary } = useBudget();
    const now = new Date();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState<BudgetInput>({
        category: "",
        amount: 0,
        month: now.getMonth() + 1,
        year: now.getFullYear(),
    });
    const [amountInput, setAmountInput] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

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

    const handleOpenModal = () => {
        setForm({
            category: "",
            amount: 0,
            month: now.getMonth() + 1,
            year: now.getFullYear(),
        });
        setAmountInput("");
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

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
            await createBudget({
                ...form,
                amount,
            });
            setIsModalOpen(false);
            await refreshBudgetSummary();
            onSuccess?.();
        } catch (error: unknown) {
            const message =
                error &&
                typeof error === "object" &&
                "response" in error &&
                error.response &&
                typeof error.response === "object" &&
                "data" in error.response &&
                error.response.data &&
                typeof error.response.data === "object" &&
                "message" in error.response.data &&
                typeof error.response.data.message === "string"
                    ? error.response.data.message
                    : "Couldn't create the budget. Please try again.";

            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <PromptCard
                title="Want to set a new budget?"
                description="Create a monthly budget for a category and stay on track with your spending."
                buttonLabel="Add Budget"
                onClick={handleOpenModal}
                icon={<Plus size={20} className={COLORS.income} />}
                className="mt-6"
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Budget">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formError ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                            {formError}
                        </div>
                    ) : null}

                    <div className="w-full">
                        <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="budget-category">
                            Category
                        </label>
                        <select
                            id="budget-category"
                            value={form.category}
                            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                            className={cn(
                                "h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200",
                                COLORS.cardBg,
                                COLORS.cardBorder,
                                COLORS.textPrimary,
                                COLORS.focusRing
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
                            <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="budget-month">
                                Month
                            </label>
                            <select
                                id="budget-month"
                                value={form.month}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, month: Number(event.target.value) }))
                                }
                                className={cn(
                                    "h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200",
                                    COLORS.cardBg,
                                    COLORS.cardBorder,
                                    COLORS.textPrimary,
                                    COLORS.focusRing
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
                            onChange={(event) =>
                                setForm((prev) => ({ ...prev, year: Number(event.target.value) }))
                            }
                            required
                        />
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isSubmitting}>
                            Save Budget
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddBudgetPrompt;