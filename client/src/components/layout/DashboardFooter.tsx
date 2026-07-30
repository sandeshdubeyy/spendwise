import logo from "../../assets/images/spendwise-logo.png";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";

const DashboardFooter = () => {
    return (
        <footer
            className={cn(
                "flex h-20 items-center border-t",
                COLORS.cardBorder,
                COLORS.pageBg
            )}
        >
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 px-6 sm:flex-row lg:px-8">
                <div className="flex items-center gap-2">
                    <img src={logo} alt="SpendWise" className="h-5 w-auto" />
                    <p className={cn("text-xs", COLORS.textMuted)}>
                        © {new Date().getFullYear()} SpendWise. All rights reserved.
                    </p>
                </div>

                <nav className="flex items-center gap-5 text-xs">
                    <span className={COLORS.textMuted}>About Us</span>

                    <a
                        href={ROUTES.LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={COLORS.link}
                    >
                   
                        LinkedIn
                    </a>
                    <a
                        href={ROUTES.GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={COLORS.link}
                    >
                            GitHub
                        </a>
                </nav>
            </div>
        </footer>
    );
};

export default DashboardFooter;