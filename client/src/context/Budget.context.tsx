import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { getBudgetSummary, type BudgetSummary } from "../services/budget.services";

interface BudgetContextType {
    summary: BudgetSummary | null;
    loading: boolean;
    error: string | null;
    refreshBudgetSummary: () => Promise<void>;
}

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

export const BudgetProvider = ({ children }: { children: ReactNode }) => {
    const [summary, setSummary] = useState<BudgetSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refreshBudgetSummary = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getBudgetSummary();
            setSummary(data);
        } catch {
            setError("Couldn't load budget summary.");
            setSummary(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        refreshBudgetSummary();
    }, [refreshBudgetSummary]);

    return (
        <BudgetContext.Provider
            value={{
                summary,
                loading,
                error,
                refreshBudgetSummary,
            }}
        >
            {children}
        </BudgetContext.Provider>
    );
};

export const useBudget = () => {
    const context = useContext(BudgetContext);

    if (!context) {
        throw new Error("useBudget must be used inside BudgetProvider.");
    }

    return context;
};