import { Link } from "react-router-dom";
import logo from "../../assets/images/spendwise-logo.png";
import Container from "./Container";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";
import { ROUTES } from "../../constants/routes";

const Footer = () => {
	return (
		<footer className={cn("border-t", COLORS.cardBorder, COLORS.pageBg)}>
			<Container className="py-12">
				<div className="grid gap-10 md:grid-cols-4">
					<div className="space-y-4">
						<Link to={ROUTES.HOME} className="inline-flex items-center gap-3">
							<img src={logo} alt="SpendWise Logo" className="h-8 w-auto" />
						</Link>
						<p className={cn("max-w-xs text-sm", COLORS.textSecondary)}>
							Modern personal finance management for people who want clarity,
							control, and confidence.
						</p>
					</div>

					<div>
						<h3 className={cn("mb-4 text-sm font-semibold", COLORS.textPrimary)}>
							Product
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link to={ROUTES.HOME} className={COLORS.textSecondary}>
									Features
								</Link>
							</li>
							<li>
								<Link to={ROUTES.REGISTER} className={COLORS.textSecondary}>
									Get Started
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className={cn("mb-4 text-sm font-semibold", COLORS.textPrimary)}>
							Company
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link to={ROUTES.HOME} className={COLORS.textSecondary}>
									About
								</Link>
							</li>
							<li>
								<Link to={ROUTES.LOGIN} className={COLORS.textSecondary}>
									Login
								</Link>
							</li>
						</ul>
					</div>

					<div>
						<h3 className={cn("mb-4 text-sm font-semibold", COLORS.textPrimary)}>
							Conatct me
						</h3>
						<ul className="space-y-3 text-sm">
							<li>
								<Link to={ROUTES.LINKEDIN} className={COLORS.textSecondary}>
									Linkedin
								</Link>
							</li>
							<li>
								<Link to={ROUTES.GITHUB} className={COLORS.textSecondary}>
									Github
								</Link>
							</li>
						</ul>
					</div>
				</div>

				<div
					className={cn(
						"mt-10 border-t pt-6 text-sm",
						COLORS.cardBorder,
						COLORS.textMuted
					)}
				>
					© {new Date().getFullYear()} SpendWise. All rights reserved.
				</div>
			</Container>
		</footer>
	);
};

export default Footer;