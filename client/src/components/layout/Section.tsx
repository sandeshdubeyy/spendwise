import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

interface SectionProps extends HTMLAttributes<HTMLElement> {
	children: ReactNode;
}

const Section = ({ className, children, id, ...props }: SectionProps) => {
	return (
		<section
			id={id}
			className={cn("py-16 md:py-24", className)}
			{...props}
		>
			{children}
		</section>
	);
};

export default Section;