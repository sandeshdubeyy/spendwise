import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

const steps = [
    {
        step: 1,
        title: "Plan your budgets",
        description:
            "Create budgets for every category and keep your spending aligned with what matters most.",
        position: "left",
    },
    {
        step: 2,
        title: "Track every expense",
        description:
            "Capture spending details and see how every transaction contributes to your cash flow.",
        position: "right",
    },
    {
        step: 3,
        title: "Grow your savings",
        description:
            "Set savings goals, watch progress build, and keep your future plans within reach.",
        position: "left",
    },
    {
        step: 4,
        title: "Analyze your money",
        description:
            "Use dashboard insights to spot trends, compare categories, and make smarter money moves.",
        position: "right",
    },
];

const ProcessSection = () => {
    return (
        <section className={cn("py-16 md:py-24", COLORS.pageBg)}>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-12 text-center">
                    <p className={cn("text-sm font-semibold uppercase tracking-[0.3em]", COLORS.income)}>
                        4 steps to track and analyze your money
                    </p>
                    <h2 className={cn("mt-4 text-3xl font-bold sm:text-4xl", COLORS.textBrand)}>
                        Get your money tracked and analyzed in just four steps
                    </h2>
                </div>

                <div className="grid gap-12">
                    {steps.map((item) => {
                        const isLeft = item.position === "left";

                        return (
                            <div
                                key={item.step}
                                className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.05fr_0.95fr]"
                            >
                                {isLeft ? (
                                    <>
                                        <div className="relative min-h-[280px] overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)] dark:bg-slate-950">
                                            <span
                                                className={cn(
                                                    "pointer-events-none absolute right-6 top-6 text-[7rem] font-black leading-none opacity-10",
                                                    "text-slate-900 dark:text-white"
                                                )}
                                            >
                                                {item.step}
                                            </span>

                                            <div className="relative space-y-4">
                                                <p className={cn("text-sm font-semibold uppercase tracking-[0.3em]", COLORS.accent)}>
                                                    Step {item.step}
                                                </p>
                                                <h3 className={cn("text-2xl font-semibold", COLORS.textPrimary)}>
                                                    {item.title}
                                                </h3>
                                                <p className={cn("text-sm leading-7", COLORS.textSecondary)}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950/5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)] dark:border-slate-700 dark:bg-slate-900">
                                            <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-500 dark:text-slate-400">
                                                <div className="w-full">
                                                    <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                        Image placeholder
                                                    </p>
                                                    <p className="text-xs">
                                                        Add your screenshot or mockup here for step {item.step}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950/5 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)] dark:border-slate-700 dark:bg-slate-900">
                                            <div className="flex h-full w-full items-center justify-center px-4 text-center text-sm text-slate-500 dark:text-slate-400">
                                                <div className="w-full">
                                                    <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                                                        Image placeholder
                                                    </p>
                                                    <p className="text-xs">
                                                        Add your screenshot or mockup here for step {item.step}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative min-h-[280px] overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_24px_80px_-40px_rgba(0,0,0,0.45)] dark:bg-slate-950">
                                            <span
                                                className={cn(
                                                    "pointer-events-none absolute right-6 top-6 text-[7rem] font-black leading-none opacity-10",
                                                    "text-slate-900 dark:text-white"
                                                )}
                                            >
                                                {item.step}
                                            </span>

                                            <div className="relative space-y-4">
                                                <p className={cn("text-sm font-semibold uppercase tracking-[0.3em]", COLORS.accent)}>
                                                    Step {item.step}
                                                </p>
                                                <h3 className={cn("text-2xl font-semibold", COLORS.textPrimary)}>
                                                    {item.title}
                                                </h3>
                                                <p className={cn("text-sm leading-7", COLORS.textSecondary)}>
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;