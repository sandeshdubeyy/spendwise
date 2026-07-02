import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
}

const Container = ({ className, children, ...props }: ContainerProps) => {
	return (
		<div
			className={cn("mx-auto w-full max-w-7xl px-6 lg:px-8", className)}
			{...props}
		>
			{children}
		</div>
	);
};

export default Container;