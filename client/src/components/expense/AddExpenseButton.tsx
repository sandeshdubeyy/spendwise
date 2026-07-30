import { useEffect, useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import PromptCard from "../common/PromptCard";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import {
    createExpense,
    type ExpenseInput,
    type ExpenseType,
    type PaymentMethod,
} from "../../services/expense.services";
import { getCategory, type Category } from "../../services/category.services";

interface AddExpenseButtonProps {
    onSuccess?: () => void;
}

interface ExpenseFormState {
    title: string;
    amount: string;
    category: string;
    type: ExpenseType;
    paymentMethod: PaymentMethod;
    date: string;
    isReccuring: boolean;
    note: string;
}

const initialFormState: ExpenseFormState = {
    title: "",
    amount: "",
    category: "",
    type: "expense",
    paymentMethod: "cash",
    date: new Date().toISOString().slice(0, 10),
    isReccuring: false,
    note: "",
};

const AddExpenseButton = ({ onSuccess }: AddExpenseButtonProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState<ExpenseFormState>(initialFormState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const loadCategories = async () => {
        try {
            const data = await getCategory();
            setCategories(data);
        } catch {
            setCategories([]);
        }
    };

    useEffect(() => {
        if (!isModalOpen) return;
        loadCategories();
    }, [isModalOpen]);

    const handleOpenModal = () => {
        setFormError(null);
        setForm(initialFormState);
        setIsModalOpen(true);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (!form.title.trim()) {
            setFormError("Please enter a title.");
            return;
        }

        const amount = Number(form.amount);
        if (!Number.isFinite(amount) || amount <= 0) {
            setFormError("Please enter a valid amount.");
            return;
        }

        if (!form.category) {
            setFormError("Please select a category.");
            return;
        }

        try {
            setIsSubmitting(true);

            const payload: ExpenseInput = {
                title: form.title.trim(),
                amount,
                category: form.category,
                type: form.type,
                paymentMethod: form.paymentMethod,
                date: form.date || undefined,
                isReccuring: form.isReccuring,
                note: form.note.trim() || undefined,
            };

            await createExpense(payload);
            setIsModalOpen(false);
            setForm(initialFormState);
            onSuccess?.();
        } catch {
            setFormError("Couldn't save the expense. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <PromptCard
                title="Need to add another transaction?"
                description="Create a new expense or income entry in seconds."
                buttonLabel="Add Expense"
                onClick={handleOpenModal}
                icon={<Plus size={20} className={COLORS.income} />}
                className="mt-6"
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Expense">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formError ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                            {formError}
                        </div>
                    ) : null}

                    <Input
                        label="Title"
                        placeholder="Groceries"
                        value={form.title}
                        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                        required
                    />

                    <Input
                        label="Amount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.amount}
                        onChange={(event) => setForm((prev) => ({ ...prev, amount: event.target.value }))}
                        required
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="w-full">
                            <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="expense-type">
                                Type
                            </label>
                            <select
                                id="expense-type"
                                value={form.type}
                                onChange={(event) =>
                                    setForm((prev) => ({ ...prev, type: event.target.value as ExpenseType }))
                                }
                                className={cn(
                                    "h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200",
                                    COLORS.cardBg,
                                    COLORS.cardBorder,
                                    COLORS.textPrimary,
                                    COLORS.focusRing
                                )}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="payment-method">
                                Payment Method
                            </label>
                            <select
                                id="payment-method"
                                value={form.paymentMethod}
                                onChange={(event) =>
                                    setForm((prev) => ({
                                        ...prev,
                                        paymentMethod: event.target.value as PaymentMethod,
                                    }))
                                }
                                className={cn(
                                    "h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200",
                                    COLORS.cardBg,
                                    COLORS.cardBorder,
                                    COLORS.textPrimary,
                                    COLORS.focusRing
                                )}
                            >
                                <option value="cash">Cash</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                                <option value="bank_transfer">Bank Transfer</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full">
                        <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="expense-category">
                            Category
                        </label>
                        <select
                            id="expense-category"
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
                        label="Date"
                        type="date"
                        value={form.date}
                        onChange={(event) => setForm((prev) => ({ ...prev, date: event.target.value }))}
                    />

                    <div className="w-full">
                        <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="expense-note">
                            Note
                        </label>
                        <textarea
                            id="expense-note"
                            rows={3}
                            value={form.note}
                            onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                            className={cn(
                                "w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-200",
                                COLORS.cardBg,
                                COLORS.cardBorder,
                                COLORS.textPrimary,
                                COLORS.focusRing
                            )}
                            placeholder="Optional note"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <input
                            type="checkbox"
                            checked={form.isReccuring}
                            onChange={(event) =>
                                setForm((prev) => ({ ...prev, isReccuring: event.target.checked }))
                            }
                        />
                        Recurring transaction
                    </label>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isSubmitting}>
                            Save Expense
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddExpenseButton;