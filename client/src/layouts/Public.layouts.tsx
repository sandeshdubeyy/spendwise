import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { COLORS } from "../constants/colors";
import { cn } from "../utils/cn";

interface PublicLayoutProps {
	children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
	return (
		<div className={cn("min-h-screen", COLORS.pageBg)}>
			<Navbar />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default PublicLayout;