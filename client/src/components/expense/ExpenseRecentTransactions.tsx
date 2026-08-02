import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Trash } from "lucide-react";
import { Card, CardHeader } from "../common/Card";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import {
    deleteExpense,
    getRecentTransactions,
    updateExpense,
    type Expense,
    type ExpenseInput,
    type ExpenseType,
    type PaymentMethod,
} from "../../services/expense.services";
import { getCategory, type Category } from "../../services/category.services";

const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(value);

const paymentMethodLabel: Record<string, string> = {
    upi: "UPI",
    cash: "Cash",
    bank_transfer: "Bank Transfer",
    card: "Card",
};

const getCategoryName = (category: Expense["category"]) =>
    typeof category === "string" ? category : category?.name ?? "—";

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

interface ExpenseRecentTransactionsProps {
    refreshKey?: number;
    onRefresh?: () => void;
}

const SkeletonRow = () => (
    <tr>
        {Array.from({ length: 7 }).map((_, i) => (
            <td key={i} className="px-4 py-4">
                <div className="h-3 w-3/4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </td>
        ))}
    </tr>
);

const ExpenseRecentTransactions = ({ refreshKey = 0, onRefresh }: ExpenseRecentTransactionsProps) => {
    const [transactions, setTransactions] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [form, setForm] = useState<ExpenseFormState>({
        title: "",
        amount: "",
        category: "",
        type: "expense",
        paymentMethod: "cash",
        date: new Date().toISOString().slice(0, 10),
        isReccuring: false,
        note: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const loadTransactions = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getRecentTransactions();
            setTransactions(data);
        } catch {
            setError("Couldn't load recent transactions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTransactions();
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

    const openEditModal = (expense: Expense) => {
        setEditingExpense(expense);
        setForm({
            title: expense.title,
            amount: String(expense.amount),
            category: typeof expense.category === "string" ? expense.category : expense.category?._id ?? "",
            type: expense.type,
            paymentMethod: expense.paymentMethod,
            date: expense.date
                ? new Date(expense.date).toISOString().slice(0, 10)
                : new Date().toISOString().slice(0, 10),
            isReccuring: expense.isReccuring,
            note: expense.note ?? "",
        });
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (expenseId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this expense?");
        if (!confirmed) return;

        try {
            await deleteExpense(expenseId);
            await loadTransactions();
            onRefresh?.();
        } catch {
            window.alert("Couldn't delete the expense. Please try again.");
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (!editingExpense) return;

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

            await updateExpense(editingExpense._id, payload);

            setIsModalOpen(false);
            setEditingExpense(null);
            await loadTransactions();
            onRefresh?.();
        } catch {
            setFormError("Couldn't update the expense. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Card className="mt-6">
                <CardHeader>
                    <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>
                        Recent Transactions
                    </h3>
                </CardHeader>

                <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                        <thead>
                            <tr className={cn("border-b", COLORS.cardBorder)}>
                                <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>Title</th>
                                <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>Category</th>
                                <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>Type</th>
                                <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>Payment Method</th>
                                <th className={cn("px-4 py-3 text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>Date</th>
                                <th className={cn("px-4 py-3 text-right text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>Amount</th>
                                <th className={cn("px-4 py-3 text-right text-xs font-medium uppercase tracking-wider", COLORS.textMuted)}>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
                            ) : error ? (
                                <tr>
                                    <td colSpan={7} className={cn("px-4 py-8 text-center text-sm", COLORS.danger)}>
                                        {error}
                                    </td>
                                </tr>
                            ) : transactions.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className={cn("px-4 py-8 text-center text-sm", COLORS.textMuted)}>
                                        No transactions yet. Add your first one to see it here.
                                    </td>
                                </tr>
                            ) : (
                                transactions.map((txn) => (
                                    <tr
                                        key={txn._id}
                                        className="transition-colors duration-150 hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                    >
                                        <td className={cn("px-4 py-4 font-medium", COLORS.textPrimary)}>{txn.title}</td>
                                        <td className={cn("px-4 py-4", COLORS.textSecondary)}>{getCategoryName(txn.category)}</td>
                                        <td className="px-4 py-4">
                                            <span className={cn("capitalize", txn.type === "income" ? COLORS.income : COLORS.expense)}>
                                                {txn.type}
                                            </span>
                                        </td>
                                        <td className={cn("px-4 py-4", COLORS.textSecondary)}>
                                            {paymentMethodLabel[txn.paymentMethod] ?? txn.paymentMethod}
                                        </td>
                                        <td className={cn("px-4 py-4", COLORS.textSecondary)}>{formatDate(txn.date)}</td>
                                        <td
                                            className={cn(
                                                "px-4 py-4 text-right font-medium tabular-nums",
                                                txn.type === "income" ? COLORS.income : COLORS.expense
                                            )}
                                        >
                                            {txn.type === "income" ? "+" : "-"}
                                            {formatMoney(txn.amount)}
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(txn)}
                                                    className="rounded p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                                    aria-label="Update transaction"
                                                >
                                                    <Pencil size={16} className={COLORS.textMuted} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(txn._id)}
                                                    className="rounded p-1.5 transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                                                    aria-label="Delete transaction"
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

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Update Expense">
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
                            <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="recent-expense-type">
                                Type
                            </label>
                            <select
                                id="recent-expense-type"
                                value={form.type}
                                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as ExpenseType }))}
                                className={cn("h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200", COLORS.cardBg, COLORS.cardBorder, COLORS.textPrimary, COLORS.focusRing)}
                            >
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>

                        <div className="w-full">
                            <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="recent-payment-method">
                                Payment Method
                            </label>
                            <select
                                id="recent-payment-method"
                                value={form.paymentMethod}
                                onChange={(event) => setForm((prev) => ({ ...prev, paymentMethod: event.target.value as PaymentMethod }))}
                                className={cn("h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200", COLORS.cardBg, COLORS.cardBorder, COLORS.textPrimary, COLORS.focusRing)}
                            >
                                <option value="cash">Cash</option>
                                <option value="upi">UPI</option>
                                <option value="card">Card</option>
                                <option value="bank_transfer">Bank Transfer</option>
                            </select>
                        </div>
                    </div>

                    <div className="w-full">
                        <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="recent-expense-category">
                            Category
                        </label>
                        <select
                            id="recent-expense-category"
                            value={form.category}
                            onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                            className={cn("h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200", COLORS.cardBg, COLORS.cardBorder, COLORS.textPrimary, COLORS.focusRing)}
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
                        <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="recent-expense-note">
                            Note
                        </label>
                        <textarea
                            id="recent-expense-note"
                            rows={3}
                            value={form.note}
                            onChange={(event) => setForm((prev) => ({ ...prev, note: event.target.value }))}
                            className={cn("w-full rounded-lg border px-3 py-2 text-sm transition-colors duration-200", COLORS.cardBg, COLORS.cardBorder, COLORS.textPrimary, COLORS.focusRing)}
                            placeholder="Optional note"
                        />
                    </div>

                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                        <input
                            type="checkbox"
                            checked={form.isReccuring}
                            onChange={(event) => setForm((prev) => ({ ...prev, isReccuring: event.target.checked }))}
                        />
                        Recurring transaction
                    </label>

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

export default ExpenseRecentTransactions;