import type { ReactNode } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { COLORS } from "../constants/colors";
import { cn } from "../utils/cn";
import Register from "../pages/public/Register/Register";
import Login from "../pages/public/Login/Login";

interface PublicLayoutProps {
	children: ReactNode;
}

const PublicLayout = ({ children }: PublicLayoutProps) => {
	return (
		<div className={cn("min-h-screen", COLORS.pageBg)}>
			<Navbar />
			<main>{children}</main>
			{!(children==<Register/> || children==<Login/>) ? <></> : <Footer/>}
		</div>
	);
};

export default PublicLayout;