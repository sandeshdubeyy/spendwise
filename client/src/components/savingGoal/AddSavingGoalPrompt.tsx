import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import PromptCard from "../common/PromptCard";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { createSavingGoal, type SavingsGoalInput } from "../../services/savingGoal.services";

interface AddSavingGoalPromptProps {
    onSuccess?: () => void;
}

const AddSavingGoalPrompt = ({ onSuccess }: AddSavingGoalPromptProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState({
        title: "",
        targetAmount: "",
        currentAmount: "",
        deadline: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleOpenModal = () => {
        setForm({ title: "", targetAmount: "", currentAmount: "", deadline: "" });
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

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

            const payload: SavingsGoalInput = {
                title: form.title.trim(),
                targetAmount,
                currentAmount,
                deadline: form.deadline || undefined,
            };

            await createSavingGoal(payload);
            setIsModalOpen(false);
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
                    : "Couldn't create the savings goal. Please try again.";

            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <PromptCard
                title="Want to set a new savings goal?"
                description="Create a savings goal and track your progress toward it."
                buttonLabel="Add Savings Goal"
                onClick={handleOpenModal}
                icon={<Plus size={20} className={COLORS.income} />}
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Savings Goal">
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
                        label="Current Amount (optional)"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="0.00"
                        value={form.currentAmount}
                        onChange={(event) => setForm((prev) => ({ ...prev, currentAmount: event.target.value }))}
                    />

                    <div className="w-full">
                        <label className={cn("mb-2 block text-sm font-medium", COLORS.textPrimary)} htmlFor="goal-deadline">
                            Deadline (optional)
                        </label>
                        <input
                            id="goal-deadline"
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
                            Save Goal
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddSavingGoalPrompt;