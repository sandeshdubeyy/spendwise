import {
    ArrowRight,
    BarChart3,
    Layers3,
    ReceiptText,
    Sparkles,
    Target,
    Wallet,
} from "lucide-react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

const featureNodes = [
    {
        title: "Budget by category",
        icon: Wallet,
        accent:
            "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
    },
    {
        title: "Track expenses",
        icon: ReceiptText,
        accent:
            "bg-sky-100 text-sky-700 dark:bg-sky-900/20 dark:text-sky-300",
    },
    {
        title: "Set savings goals",
        icon: Target,
        accent:
            "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-300",
    },
    {
        title: "See analytics",
        icon: BarChart3,
        accent:
            "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300",
    },
    {
        title: "Keep categories tidy",
        icon: Layers3,
        accent:
            "bg-pink-100 text-pink-700 dark:bg-pink-900/20 dark:text-pink-300",
    },
    {
        title: "Stay in control",
        icon: Sparkles,
        accent:
            "bg-amber-100 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300",
    },
];

const FeatureFlowSection = () => {
    return (
        <section id="featuresFlow" className={cn("relative overflow-hidden py-20 md:py-24", COLORS.pageBg)}>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-10 h-72 w-40 -translate-x-1/2 rounded-full bg-gradient-to-br from-green-200/50 to-green-400/10 blur-3xl dark:from-blue-900/30 dark:to-blue-400/10" />
                <div className="absolute bottom-25 right-6 h-64 w-64 rounded-full bg-gradient-to-br from-[#1e3a8a]/15 to-[#60a5fa]/10 blur-3xl dark:from-blue-700/20 dark:to-cyan-400/10" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-14 text-center">
                    <p className={cn("text-sm font-semibold uppercase tracking-[0.3em]", COLORS.income)}>
                        SpendWise V1
                    </p>

                    <h2 className={cn("mt-4 text-3xl font-bold sm:text-4xl", COLORS.textBrand)}>
                        Features we offer in SpendWise
                    </h2>

                    <p className={cn("mx-auto mt-4 max-w-2xl text-sm leading-7", COLORS.textSecondary)}>
                        From budgets and expenses to savings goals and analytics, SpendWise gives you a clear and calm way to manage your money.
                    </p>
                </div>

                <div className="mx-auto max-w-6xl">
                    <div className="relative hidden min-h-[560px] items-center justify-center lg:flex">
                        <div className="absolute h-[430px] w-[430px] rounded-full border border-dashed border-green-200/70 dark:border-blue-700/60" />
                        <div className="absolute h-[320px] w-[320px] rounded-full border border-green-100/70 dark:border-blue-800/60" />

                        <div
                            className={cn(
                                "relative z-10 flex h-44 w-44 items-center justify-center rounded-full border border-white/70 bg-gradient-to-br from-green-600 to-[#1e3a8a] text-center text-white shadow-[0_25px_80px_-25px_rgba(0,0,0,0.35)] dark:from-blue-600 dark:to-[#0b1f3a]"
                            )}
                        >
                            <div>
                                <p className="text-[10px] font-semibold uppercase tracking-[0.25em] opacity-80">
                                    SpendWise
                                </p>
                                <h3 className="mt-2 text-xl font-semibold">
                                    Features
                                </h3>
                            </div>
                        </div>

                        {featureNodes.map((item, index) => {
                            const Icon = item.icon;
                            const angle = (index / featureNodes.length) * (2 * Math.PI) - Math.PI / 2;
                            const x = Math.cos(angle) * 190;
                            const y = Math.sin(angle) * 190;

                            return (
                                <div
                                    key={item.title}
                                    style={{ transform: `translate(${x}px, ${y}px)` }}
                                    className="absolute left-1/2 top-1/2 z-20 w-44 -translate-x-1/2 -translate-y-1/2"
                                >
                                    <div
                                        className={cn(
                                            "rounded-[20px] border p-4 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.35)]",
                                            COLORS.cardBg,
                                            COLORS.cardBorder
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className={cn("flex h-10 w-10 items-center justify-center rounded-full", item.accent)}>
                                                <Icon size={18} />
                                            </span>

                                            <p className={cn("text-sm font-semibold", COLORS.textPrimary)}>
                                                {item.title}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
                        {featureNodes.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.title}
                                    className={cn(
                                        "rounded-[20px] border p-4 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.35)]",
                                        COLORS.cardBg,
                                        COLORS.cardBorder
                                    )}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className={cn("flex h-10 w-10 items-center justify-center rounded-full", item.accent)}>
                                            <Icon size={18} />
                                        </span>

                                        <p className={cn("text-sm font-semibold", COLORS.textPrimary)}>
                                            {item.title}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <a
                        href="#upcoming-features"
                        className={cn(
                            "inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-medium transition-colors duration-200",
                            COLORS.primaryBtn
                        )}
                    >
                        See what’s coming next
                        <ArrowRight size={16} />
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FeatureFlowSection;