import { useEffect, useRef, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Pencil,Trash } from "lucide-react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import {
    deleteExpense,
    getExpenses,
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
    });

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);

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

const ExpenseSearchBar = () => {
    const [query, setQuery] = useState("");
    const [type, setType] = useState<ExpenseType | "">("");
    const [results, setResults] = useState<Expense[]>([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
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

    const containerRef = useRef<HTMLDivElement | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const onClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", onClickOutside);
        return () => document.removeEventListener("mousedown", onClickOutside);
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        if (!query.trim() && !type) {
            setResults([]);
            setLoading(false);
            return;
        }

        setLoading(true);

        debounceRef.current = setTimeout(async () => {
            try {
                const data = await getExpenses({
                    search: query.trim() || undefined,
                    type: type || undefined,
                });
                setResults(data);
            } catch {
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, [query, type]);

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

    const handleClear = () => {
        setQuery("");
        setType("");
        setResults([]);
        setOpen(false);
    };

    const handleSeeAll = () => {
        const params = new URLSearchParams();
        if (query.trim()) params.set("search", query.trim());
        if (type) params.set("type", type);
        navigate(`/expenses?${params.toString()}`);
        setOpen(false);
    };

    const openEditModal = (expense: Expense) => {
        setEditingExpense(expense);
        setForm({
            title: expense.title,
            amount: String(expense.amount),
            category: typeof expense.category === "string" ? expense.category : expense.category?._id ?? "",
            type: expense.type,
            paymentMethod: expense.paymentMethod,
            date: expense.date ? new Date(expense.date).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
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

            const data = await getExpenses({
                search: query.trim() || undefined,
                type: type || undefined,
            });

            setResults(data);
            setOpen(false);
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
            setForm({
                title: "",
                amount: "",
                category: "",
                type: "expense",
                paymentMethod: "cash",
                date: new Date().toISOString().slice(0, 10),
                isReccuring: false,
                note: "",
            });

            const data = await getExpenses({
                search: query.trim() || undefined,
                type: type || undefined,
            });
            setResults(data);
        } catch {
            setFormError("Couldn't update the expense. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div ref={containerRef} className="relative w-full max-w-2xl">
                <div className="flex flex-col gap-2 sm:flex-row">
                    <div className="relative flex-1">
                        <Search
                            size={18}
                            className={cn("pointer-events-none absolute left-3 top-1/2 -translate-y-1/2", COLORS.textMuted)}
                        />

                        <input
                            type="text"
                            value={query}
                            onChange={(e) => {
                                setQuery(e.target.value);
                                setOpen(true);
                            }}
                            onFocus={() => (query.trim() || type) && setOpen(true)}
                            placeholder="Search transactions or categories..."
                            className={cn(
                                "h-10 w-full rounded-lg border pl-10 pr-9 text-sm transition-colors duration-200",
                                COLORS.cardBg,
                                COLORS.cardBorder,
                                COLORS.textPrimary,
                                "placeholder:text-slate-400 dark:placeholder:text-slate-500",
                                COLORS.focusRing
                            )}
                        />

                        {query ? (
                            <button
                                onClick={handleClear}
                                aria-label="Clear search"
                                className={cn(
                                    "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 transition-colors",
                                    "hover:bg-slate-100 dark:hover:bg-slate-800"
                                )}
                            >
                                <X size={16} className={COLORS.textMuted} />
                            </button>
                        ) : null}
                    </div>

                    <select
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value as ExpenseType | "");
                            setOpen(true);
                        }}
                        className={cn(
                            "h-10 rounded-lg border px-3 text-sm transition-colors duration-200",
                            COLORS.cardBg,
                            COLORS.cardBorder,
                            COLORS.textPrimary,
                            COLORS.focusRing
                        )}
                    >
                        <option value="">All types</option>
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                {open && (query.trim() || type) ? (
                    <div
                        className={cn(
                            "absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-96 overflow-y-auto rounded-lg border shadow-lg",
                            "bg-white dark:bg-slate-900",
                            COLORS.cardBorder
                        )}
                    >
                        {loading ? (
                            <div className="px-4 py-6 text-center">
                                <p className={cn("text-sm", COLORS.textMuted)}>Searching...</p>
                            </div>
                        ) : results.length === 0 ? (
                            <div className="px-4 py-6 text-center">
                                <p className={cn("text-sm", COLORS.textMuted)}>
                                    No transactions found for "{query || "your filters"}"
                                </p>
                            </div>
                        ) : (
                            <>
                                <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                                    {results.slice(0, 6).map((txn) => (
                                        <li
                                            key={txn._id}
                                            className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                                        >
                                            <div className="min-w-0">
                                                <p className={cn("truncate text-sm font-medium", COLORS.textPrimary)}>
                                                    {txn.title}
                                                </p>
                                                <p className={cn("text-xs", COLORS.textMuted)}>
                                                    {getCategoryName(txn.category)} · {formatDate(txn.date)}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <p
                                                    className={cn(
                                                        "shrink-0 text-sm font-medium tabular-nums",
                                                        txn.type === "income" ? COLORS.income : COLORS.expense
                                                    )}
                                                >
                                                    {txn.type === "income" ? "+" : "-"}
                                                    {formatMoney(txn.amount)}
                                                </p>

                                                <button
                                                    type="button"
                                                    onClick={() => openEditModal(txn)}
                                                    className="rounded p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                                    aria-label="Update expense"
                                                >
                                                    <Pencil size={16} className={COLORS.textMuted} />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDelete(txn._id)}
                                                    className="rounded p-1.5 transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                                                    aria-label="Delete expense"
                                                >
                                                    <Trash size={16} className="text-red-500" />
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>

                                {results.length > 6 ? (
                                    <button
                                        onClick={handleSeeAll}
                                        className={cn(
                                            "w-full border-t px-4 py-3 text-center text-sm font-medium transition-colors",
                                            COLORS.cardBorder,
                                            COLORS.link
                                        )}
                                    >
                                        See all {results.length} results
                                    </button>
                                ) : null}
                            </>
                        )}
                    </div>
                ) : null}
            </div>

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

export default ExpenseSearchBar;