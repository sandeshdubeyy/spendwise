import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { COLORS } from "../constants/colors";
import { cn } from "../utils/cn";

interface PublicLayoutProps {
	children: ReactNode;
	hideFooter?: boolean;
}

const PublicLayout = ({ children, hideFooter = false }: PublicLayoutProps) => {
	return (
		<div className={cn("min-h-screen", COLORS.pageBg)}>
			<Navbar />
			<main>{children}</main>
			{!hideFooter && <Footer />}
		</div>
	);
};

export default PublicLayout;