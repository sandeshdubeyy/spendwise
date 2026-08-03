import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

const UpcomingFeatures = () => {
    return (
        <section
            id="upcoming-features"
            className={cn("relative scroll-mt-24 overflow-hidden py-16 md:py-24", COLORS.pageBg)}
        >
            {/* Decorative shapes */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-20 top-20 h-42 w-42 rounded-full bg-linear-to-tr from-green-200/40 to-green-400/20 blur-3xl"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -bottom-20 h-46 w-96 rounded-full bg-linear-to-bl from-brand-blue/20 to-[#60a5fa]/10 blur-3xl"
            />

            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-8 text-center">
                    <p className={cn("mx-auto max-w-180 text-sm font-semibold uppercase tracking-[0.3em]", COLORS.income)}>
                        Coming soon
                    </p>

                    <h2 className={cn("mt-4 text-3xl font-bold sm:text-4xl", COLORS.textBrand)}>
                        Smart recommendations and bulk imports
                    </h2>

                    <p className={cn("mt-3 mx-auto max-w-2xl text-sm leading-7", COLORS.textSecondary)}>
                        We're adding an AI recommendation engine to surface personalized saving and budgeting tips,
                        plus CSV import so you can upload all your transactions in one go.
                    </p>
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                    <div className={cn("rounded-[20px] p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)]", COLORS.cardBg, "border", COLORS.cardBorder)}>
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-green-50 to-green-100 dark:from-blue-900/30 dark:to-blue-800/20">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M12 2v6l4 2" stroke="#064e3b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#065f46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div>
                                <h3 className={cn("text-lg font-semibold", COLORS.textPrimary)}>AI Recommendation System</h3>
                                <p className={cn("mt-2 text-sm", COLORS.textSecondary)}>
                                    Personalized budgeting suggestions, category-level insights, and automated saving nudges
                                    powered by machine learning — tailored to your habits.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={cn("rounded-[20px] p-6 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.35)]", COLORS.cardBg, "border", COLORS.cardBorder)}>
                        <div className="flex items-start gap-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-orange-50 to-orange-100 dark:from-[#351f04]/30 dark:to-[#4b2e05]/20">
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M8 3v4M16 3v4M3 11h18" stroke="#92400e" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>

                            <div>
                                <h3 className={cn("text-lg font-semibold", COLORS.textPrimary)}>CSV Bulk Import</h3>
                                <p className={cn("mt-2 text-sm", COLORS.textSecondary)}>
                                    Import your transactions from CSV files to quickly migrate history or add many entries at once.
                                    Field mapping and preview make it easy and safe.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpcomingFeatures;