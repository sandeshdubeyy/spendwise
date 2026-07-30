import { BarChart3 } from "lucide-react";
import PromptCard from "../common/PromptCard";
import { COLORS } from "../../constants/colors";

const AnalyticsPrompt = () => {
    return (
        <PromptCard
            title="Want to see more analytics like this?"
            description="Dive deeper into your spending trends, budgets, and category breakdowns."
            buttonLabel="Take me there"
            to="/analytics"
            icon={<BarChart3 size={20} className={COLORS.income} />}
            className="mt-6"
        />
    );
};

export default AnalyticsPrompt;