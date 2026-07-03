import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

interface BackgroundGlowProps extends HTMLAttributes<HTMLDivElement> {
    direction?: "top-to-bottom" | "bottom-to-top";
    tone?: "green" | "blue";
}

const glowClasses = {
    "top-to-bottom": {
        green:
            "top-0 bg-gradient-to-b from-[#22c55e]/25 via-[#4ade80]/10 to-transparent dark:from-[#93c5fd]/20 dark:via-[#bfdbfe]/8 dark:to-transparent",
        blue:
            "top-0 bg-gradient-to-b from-[#93c5fd]/20 via-[#bfdbfe]/8 to-transparent dark:from-[#93c5fd]/24 dark:via-[#bfdbfe]/10 dark:to-transparent",
    },
    "bottom-to-top": {
        green:
            "bottom-0 bg-gradient-to-t from-[#22c55e]/25 via-[#4ade80]/10 to-transparent dark:from-[#93c5fd]/20 dark:via-[#bfdbfe]/8 dark:to-transparent",
        blue:
            "bottom-0 bg-gradient-to-t from-[#93c5fd]/20 via-[#bfdbfe]/8 to-transparent dark:from-[#93c5fd]/24 dark:via-[#bfdbfe]/10 dark:to-transparent",
    },
} as const;

const BackgroundGlow = ({
    direction = "top-to-bottom",
    tone = "green",
    className,
    ...props
}: BackgroundGlowProps) => {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "pointer-events-none absolute left-1/2 h-[24rem] w-[90%] max-w-5xl -translate-x-1/2 rounded-full blur-[120px] opacity-70",
                glowClasses[direction][tone],
                className
            )}
            {...props}
        />
    );
};

export const BackgroundGlowGreenTopToBottom = (props: Omit<BackgroundGlowProps, "direction" | "tone">) => (
    <BackgroundGlow direction="top-to-bottom" tone="green" {...props} />
);

export const BackgroundGlowGreenBottomToTop = (props: Omit<BackgroundGlowProps, "direction" | "tone">) => (
    <BackgroundGlow direction="bottom-to-top" tone="green" {...props} />
);

export const BackgroundGlowBlueTopToBottom = (props: Omit<BackgroundGlowProps, "direction" | "tone">) => (
    <BackgroundGlow direction="top-to-bottom" tone="blue" {...props} />
);

export const BackgroundGlowBlueBottomToTop = (props: Omit<BackgroundGlowProps, "direction" | "tone">) => (
    <BackgroundGlow direction="bottom-to-top" tone="blue" {...props} />
);

export default BackgroundGlow;
