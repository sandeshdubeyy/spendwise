import { Card, CardBody } from '../common/Card';
import { cn } from '../../utils/cn';
import { COLORS } from '../../constants/colors';

const AnalyticsFooter = () => {
    return (
        <div className="mt-8">
            <Card className="overflow-hidden border border-dashed border-green-200/80 bg-gradient-to-br from-green-50/80 via-white to-blue-50/70 dark:border-blue-800/50 dark:from-[#0f2340] dark:via-[#132d4a] dark:to-[#10233f]">
                <CardBody className="relative">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.12),transparent_45%),radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.14),transparent_45%)]" />
                    <div className="relative flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl">
                            <p className={cn("text-sm font-semibold uppercase tracking-[0.3em]", COLORS.income)}>
                                Coming soon
                            </p>
                            <h3 className={cn("mt-3 text-xl font-semibold", COLORS.textPrimary)}>
                                AI-powered analysis is coming soon in v2
                            </h3>
                            <p className={cn("mt-2 text-sm leading-7", COLORS.textSecondary)}>
                                We&apos;re adding an AI recommendation engine to surface personalized saving and budgeting tips,
                                plus smarter insights that help you understand your spending habits at a glance.
                            </p>
                        </div>

                        <div className={cn("rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm dark:border-blue-800/50 dark:bg-[#11253f]/80", COLORS.textSecondary)}>
                            <p className="text-sm font-medium">Smarter recommendations and richer insights</p>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default AnalyticsFooter;
