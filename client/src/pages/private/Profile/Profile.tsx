import { useEffect, useState } from "react";
import { Mail, Wallet, TrendingUp, TrendingDown, Receipt, ArrowLeft } from "lucide-react";
import { Card } from "../../../components/common/Card";
import StatCard from "../../../components/dashboard/StatCard";
import PromptCard from "../../../components/common/PromptCard";
import Spinner from "../../../components/common/Spinner";
import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import { getCurrentUser, type AuthUser } from "../../../services/auth.services";
import { getDashboardSummary } from "../../../services/expense.services";
import defaultAvatar from "../../../assets/images/avatar.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";

interface Summary {
    transactionCount: number;
    totalIncome: number;
    totalExpense: number;
    currentBalance: number;
}

const formatMoney = (value: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "INR" }).format(value);

const Profile = () => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const [userData, summaryData] = await Promise.all([
                    getCurrentUser(),
                    getDashboardSummary(),
                ]);
                setUser(userData);
                setSummary(summaryData);
            } catch {
                setError("Couldn't load your profile. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return (
        <>
            <button
                type="button"
                onClick={() => navigate(ROUTES.DASHBOARD)}
                className={cn(
                    "mb-4 inline-flex items-center gap-2 text-sm font-medium transition-colors pt-5 pl-5",
                    COLORS.link
                )}
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </button>
            <div className="p-5 flex items-center justify-center">
                <div className=" w-full max-w-5xl">
                    <div className="mb-6">
                        <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Profile</h1>
                        <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
                            Your account details and overview.
                        </p>
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <Spinner size="lg" className={COLORS.textBrand} />
                        </div>
                    ) : error ? (
                        <p className={COLORS.danger}>{error}</p>
                    ) : (
                        <>
                            <Card className="p-6">
                                <div className="flex flex-col items-center gap-6 sm:flex-row">
                                    <img
                                        src={defaultAvatar}
                                        alt="Profile"
                                        className="h-24 w-24 shrink-0 rounded-full object-cover"
                                    />

                                    <div className="text-center sm:text-left">
                                        <h2 className={cn("text-xl font-semibold capitalize", COLORS.textPrimary)}>
                                            {user?.name}
                                        </h2>
                                        <div className="mt-1 flex items-center justify-center gap-2 sm:justify-start">
                                            <Mail size={14} className={COLORS.textMuted} />
                                            <p className={cn("text-sm", COLORS.textSecondary)}>
                                                {user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
                                <StatCard
                                    title="Current Balance"
                                    value={formatMoney(summary!.currentBalance)}
                                    icon={Wallet}
                                    variant="default"
                                />
                                <StatCard
                                    title="Total Expenses"
                                    value={formatMoney(summary!.totalExpense)}
                                    icon={TrendingDown}
                                    variant="expense"
                                />
                                <StatCard
                                    title="Total Income"
                                    value={formatMoney(summary!.totalIncome)}
                                    icon={TrendingUp}
                                    variant="income"
                                />
                                <StatCard
                                    title="Transactions"
                                    value={String(summary!.transactionCount)}
                                    icon={Receipt}
                                    variant="default"
                                />
                            </div>

                            <div className="mt-6">
                                <PromptCard
                                    title="Want to see analytics of your expenses?"
                                    description="Dive deeper into your spending trends, budgets, and category breakdowns."
                                    buttonLabel="Go to Analytics"
                                    to="/analytics"
                                    icon={<TrendingUp size={20} className={COLORS.income} />}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Profile;