import { Activity, ShieldCheck, Wallet } from "lucide-react";
import { Card } from "../common/Card";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

const featureItems = [
    {
        title: "Track every expense",
        description:
            "See where your money goes with clear categories, expense history, and daily spending insights.",
        icon: Activity,
        accent: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
    },
    {
        title: "Stay in control",
        description:
            "Set budgets, get alerts, and keep your financial goals on track without the guesswork.",
        icon: ShieldCheck,
        accent: "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300",
    },
    {
        title: "Build smarter savings",
        description:
            "Manage saving goals, compare progress, and make every paycheck work harder for you.",
        icon: Wallet,
        accent: "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
    },
];

const FeatureCards = () => {
    return (
        <section className={cn("py-16 md:py-24", COLORS.pageBg)}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-10 text-center">
                    <p className={cn("text-sm font-semibold uppercase tracking-[0.3em]", COLORS.income)}>
                        Why SpendWise
                    </p>
                    <h2 className={cn("mt-4 text-3xl font-bold sm:text-4xl", COLORS.textBrand)}>
                        Everything you need to manage spending, budgets, and savings.
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {featureItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Card
                                key={item.title}
                                className={cn(
                                    "relative overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:-translate-y-1 dark:bg-slate-950",
                                    COLORS.cardBorder
                                )}
                            >
                                <div className="absolute right-6 top-6 inline-flex h-14 w-14 items-center justify-center rounded-3xl shadow-sm">
                                    <span className={cn("flex h-full w-full items-center justify-center rounded-3xl", item.accent)}>
                                        <Icon size={24} />
                                    </span>
                                </div>

                                <div className="mt-10 space-y-4">
                                    <h3 className={cn("text-xl font-semibold", COLORS.textPrimary)}>
                                        {item.title}
                                    </h3>
                                    <p className={cn("text-sm leading-7", COLORS.textSecondary)}>
                                        {item.description}
                                    </p>
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeatureCards;