import { Banknote } from "lucide-react";
import PromptCard from "../common/PromptCard";
import { COLORS } from "../../constants/colors";

const ExpenseAnalyticsPrompt = () => {
    return (
        <PromptCard
            title="Want to see analytics of your expenses/income?"
            description="Dive deeper into your spending trends and expense breakdowns."
            buttonLabel="Take me there"
            to="/analytics"
            icon={<Banknote size={20} className={COLORS.income} />}
            className="mt-6"
        />
    );
};

export default ExpenseAnalyticsPrompt;