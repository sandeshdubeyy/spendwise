import { Plus } from "lucide-react";
import PromptCard from "../common/PromptCard";
import { COLORS } from "../../constants/colors";

const AddExpensePrompt = () => {
    return (
        <PromptCard
            title="Want to log a new expense?"
            description="Add a new expense in seconds and keep your spending records up to date."
            buttonLabel="Add Expense"
            to="/expenses"
            icon={<Plus size={20} className={COLORS.income} />}
            className="mt-6"
        />
    );
};

export default AddExpensePrompt;