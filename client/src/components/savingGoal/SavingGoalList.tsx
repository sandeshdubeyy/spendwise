import { useEffect, useState, type FormEvent } from "react";
import { Pencil, Trash, Target } from "lucide-react";
import { Card } from "../common/Card";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import ProgressBar from "../common/ProgressBar";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import {
    getSavingsGoals,
    updateSavingsGoal,
    deleteSavingsGoal,
    type SavingsGoal,
    type SavingsGoalInput,
} from "../../services/savingGoal.services";

interface SavingGoalListProps {
    refreshKey?: number;
}

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(value);

const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
};

const getProgress = (goal: SavingsGoal) => {
    const percentage = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
    const status = goal.currentAmount >= goal.targetAmount ? "completed" : "in_progress";
    return { percentage, status } as const;
};

const SkeletonCard = () => (
    <Card className="p-5">
        <div className="flex items-center justify-between gap-6">
            <div className="w-1/2 space-y-2">
                <div className="h-4 w-1/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
                <div className="h-3 w-2/3 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
            </div>
            <div className="h-2.5 w-40 animate-pulse rounded-full bg-slate-200 dark:bg-slate-800" />
        </div>
    </Card>
);

const SavingGoalList = ({ refreshKey = 0 }: SavingGoalListProps) => {
    const [goals, setGoals] = useState<SavingsGoal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
    const [form, setForm] = useState({
        title: "",
        targetAmount: "",
        currentAmount: "",
        deadline: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const loadGoals = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getSavingsGoals();
            setGoals(data);
        } catch {
            setError("Couldn't load savings goals.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadGoals();
    }, [refreshKey]);

    const openEditModal = (goal: SavingsGoal) => {
        setEditingGoal(goal);
        setForm({
            title: goal.title,
            targetAmount: String(goal.targetAmount),
            currentAmount: String(goal.currentAmount),
            deadline: goal.deadline ? goal.deadline.slice(0, 10) : "",
        });
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleDelete = async (goalId: string) => {
        const confirmed = window.confirm("Are you sure you want to delete this savings goal?");
        if (!confirmed) return;

        try {
            await deleteSavingsGoal(goalId);
            await loadGoals();
        } catch {
            window.alert("Couldn't delete the savings goal. Please try again.");
        }
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (!editingGoal) return;

        if (!form.title.trim()) {
            setFormError("Please enter a goal title.");
            return;
        }

        const targetAmount = Number(form.targetAmount);
        if (!Number.isFinite(targetAmount) || targetAmount <= 0) {
            setFormError("Please enter a valid target amount.");
            return;
        }

        const currentAmount = form.currentAmount ? Number(form.currentAmount) : 0;
        if (!Number.isFinite(currentAmount) || currentAmount < 0) {
            setFormError("Please enter a valid current amount.");
            return;
        }

        try {
            setIsSubmitting(true);

            const payload: Partial<SavingsGoalInput> = {
                title: form.title.trim(),
                targetAmount,
                currentAmount,
                deadline: form.deadline || undefined,
            };

            await updateSavingsGoal(editingGoal._id, payload);
            setIsModalOpen(false);
            setEditingGoal(null);
            await loadGoals();
        } catch {
            setFormError("Couldn't update the savings goal. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="mt-6 space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                    <SkeletonCard key={i} />
                ))}
            </div>
        );
    }

    if (error) {
        return <p className={cn("mt-6 text-sm", COLORS.danger)}>{error}</p>;
    }

    if (goals.length === 0) {
        return (
            <Card className="mt-6 p-8 text-center">
                <p className={cn("text-sm", COLORS.textMuted)}>
                    No savings goals yet. Add your first one above.
                </p>
            </Card>
        );
    }

    return (
        <>
            <div className="mt-6 space-y-4">
                {goals.map((goal) => {
                    const { percentage, status } = getProgress(goal);
                    const deadline = formatDate(goal.deadline);

                    return (
                        <Card key={goal._id} className="p-5">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-start gap-3 sm:w-2/5">
                                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        <Target size={16} />
                                    </span>

                                    <div className="min-w-0">
                                        <h3 className={cn("truncate text-sm font-semibold capitalize", COLORS.textPrimary)}>
                                            {goal.title}
                                        </h3>
                                        <p className={cn("mt-0.5 text-xs", COLORS.textSecondary)}>
                                            {formatMoney(goal.currentAmount)} of {formatMoney(goal.targetAmount)}
                                            {deadline ? ` · Due ${deadline}` : ""}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-1 items-center gap-4 sm:justify-end">
                                    <div className="w-full max-w-[220px]">
                                        <ProgressBar percentage={percentage} status={status} />
                                    </div>

                                    <div className="flex shrink-0 items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => openEditModal(goal)}
                                            className="rounded p-1.5 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                            aria-label="Edit savings goal"
                                        >
                                            <Pencil size={16} className={COLORS.textMuted} />
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(goal._id)}
                                            className="rounded p-1.5 transition-colors hover:bg-red-100 dark:hover:bg-red-900/30"
                                            aria-label="Delete savings goal"
                                        >
                                            <Trash size={16} className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Edit Savings Goal">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formError ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                            {formError}
                        </div>
                    ) : null}

                    <Input
                        label="Goal Title"
                        placeholder="e.g. Emergency Fund, New Laptop"
                        value={form.title}
                        onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                        required
                    />

                    <Input
                        label="Target Amount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.targetAmount}
                        onChange={(event) => setForm((prev) => ({ ...prev, targetAmount: event.target.value }))}
                        required
                    />

                    <Input
                        label="Current Amount"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.currentAmount}
                        onChange={(event) => setForm((prev) => ({ ...prev, currentAmount: event.target.value }))}
                    />

                    <div className="w-full">
                        <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="edit-goal-deadline">
                            Deadline (optional)
                        </label>
                        <input
                            id="edit-goal-deadline"
                            type="date"
                            value={form.deadline}
                            onChange={(event) => setForm((prev) => ({ ...prev, deadline: event.target.value }))}
                            className={cn(
                                "h-10 w-full rounded-lg border px-3 text-sm transition-colors duration-200",
                                COLORS.cardBg,
                                COLORS.cardBorder,
                                COLORS.textPrimary,
                                COLORS.focusRing
                            )}
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

export default SavingGoalList;