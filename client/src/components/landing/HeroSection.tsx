import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../layout/Container";
import Section from "../layout/Section";
import Button from "../common/Button";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";

// import laptopMockup from "../../assets/images/laptop-mockup.png";
// import mobileMockup from "../../assets/images/mobile-mockup.png";

const HeroSection = () => {
    return (
        <Section className={cn("pt-12 md:pt-20", COLORS.heroBg)}>
            <Container>
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
                    <div className="space-y-6">
                        <p className={cn("text-sm font-semibold uppercase tracking-[0.3em]", COLORS.income)}>
                            Smart money, made simple
                        </p>

                        <h1 className={cn("text-4xl font-bold leading-tight md:text-5xl lg:text-6xl", COLORS.textBrand)}>
                            SpendWise helps you manage money with clarity,
                            <span className={COLORS.income}> growth</span>, and calm.
                        </h1>

                        <p className={cn("max-w-xl text-lg leading-8", COLORS.textSecondary)}>
                            Track spending, set budgets, and watch your savings
                            grow with a clean dashboard built for everyday life.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link to={ROUTES.REGISTER}>
                                <Button size="lg">
                                    Get started
                                    <ArrowRight size={18} />
                                </Button>
                            </Link>

                            <Link to={ROUTES.HOME}>
                                <Button variant="outline" size="lg">
                                    View demo
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
                        <div
                            className={cn(
                                "relative aspect-[16/10] w-full overflow-hidden rounded-[32px] border-2 border-dashed",
                                COLORS.mockupBorder,
                                COLORS.mockupBg
                            )}
                        >
                            {/* Replace this placeholder with your laptop screenshot */}
                            <div className="flex h-full items-center justify-center">
                                <p className={cn("text-sm", COLORS.textMuted)}>
                                    Laptop mockup — drop image here
                                </p>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "absolute -bottom-6 -right-2 hidden h-[260px] min-w-[140px] overflow-hidden rounded-[28px] border-2 border-dashed md:block",
                                COLORS.mockupBorder,
                                COLORS.cardBg
                            )}
                        >
                            {/* Replace this placeholder with your mobile screenshot */}
                            <div className="flex h-full items-center justify-center px-2 text-center text-xs">
                                <p className={COLORS.textMuted}>Mobile mockup</p>
                            </div>
                        </div>

                        <div
                            className={cn(
                                "mt-5 rounded-[28px] border-2 border-dashed bg-slate-100/60 p-6 text-center text-xs text-slate-500 dark:bg-slate-900/80 dark:text-slate-400 md:hidden"
                            )}
                        >
                            Mobile mockup placeholder
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default HeroSection;