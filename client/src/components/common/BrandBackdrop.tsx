import { cn } from "../../utils/cn";

const BrandBackdrop = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
            <div
                className={cn(
                    "absolute -left-40 -top-36 h-130 w-130 rounded-full blur-3xl opacity-90",
                    "bg-linear-to-tr from-green-200/40 to-green-400/10"
                )}
            />
            <div
                className={cn(
                    "absolute -right-44 -bottom-36 h-[680px] w-[680px] rounded-full blur-3xl opacity-80",
                    "bg-linear-to-bl from-brand-blue/20 to-[#60a5fa]/10"
                )}
            />
            <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-10 h-130 w-[520px] rounded-[40%] blur-2xl bg-white/6 opacity-60" />
        </div>
    );
};

export default BrandBackdrop;