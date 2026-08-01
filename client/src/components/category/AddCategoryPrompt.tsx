import { useState, type FormEvent } from "react";
import { Plus } from "lucide-react";
import PromptCard from "../common/PromptCard";
import Modal from "../common/Modal";
import Input from "../common/Input";
import Button from "../common/Button";
import { COLORS } from "../../constants/colors";
import { createCategory } from "../../services/category.services";

interface AddCategoryPromptProps {
    onSuccess?: () => void;
}

const AddCategoryPrompt = ({ onSuccess }: AddCategoryPromptProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleOpenModal = () => {
        setName("");
        setFormError(null);
        setIsModalOpen(true);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (!name.trim()) {
            setFormError("Please enter a category name.");
            return;
        }

        try {
            setIsSubmitting(true);
            await createCategory(name.trim());
            setIsModalOpen(false);
            setName("");
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
                    : "Couldn't create the category. Please try again.";

            setFormError(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <PromptCard
                title="Want to add a new category?"
                description="Create a custom category to keep your transactions organized."
                buttonLabel="Add Category"
                onClick={handleOpenModal}
                icon={<Plus size={20} className={COLORS.income} />}
            />

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add Category">
                <form onSubmit={handleSubmit} className="space-y-4">
                    {formError ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                            {formError}
                        </div>
                    ) : null}

                    <Input
                        label="Category Name"
                        placeholder="e.g. Groceries, Rent, Salary"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        required
                    />

                    <div className="flex justify-end gap-3 pt-2">
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" isLoading={isSubmitting}>
                            Save Category
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddCategoryPrompt;