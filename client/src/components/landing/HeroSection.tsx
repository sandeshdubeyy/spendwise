import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Container from "../layout/Container";
import Section from "../layout/Section";
import Button from "../common/Button";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";
import {
    BackgroundGlowBlueTopToBottom,
    BackgroundGlowGreenTopToBottom,
} from "../common/BackgroundGlow";

import laptopMockup from "../../assets/images/laptop-mockup.png";
import mobileMockup from "../../assets/images/mobile-mockup.png";

const HeroSection = () => {
    return (
        <Section className={cn("relative overflow-hidden pt-12 md:pt-20", COLORS.heroBg)}>
            <BackgroundGlowGreenTopToBottom className="left-1/2 top-[-6rem] h-[20rem] w-[80%] opacity-80" />
            <BackgroundGlowBlueTopToBottom className="left-1/2 top-[-4rem] h-[16rem] w-[72%] opacity-60" />

            <Container className="relative z-10">
                <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-4 md:gap-20">
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
                        </div>
                    </div>

                    <div className="relative mx-auto w-full lg:max-w-none">
                        <div
                            className={cn(
                                "relative aspect-[16/10] w-full overflow-hidden rounded-[32px]",
                                
                            )}
                        >
                            <div className="flex h-full items-center justify-center ">
                                <img src={laptopMockup} alt="laptopImage" className="h-full w-full " />
                            </div>
                        </div>

                        <div
                            className={cn(
                                "absolute -bottom-6 -right-2 hidden h-[280px] w-[150px] overflow-hidden rounded-[28px] md:block",
                            )}
                        >
                            <img src={mobileMockup} alt="" className="h-full w-full" />
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