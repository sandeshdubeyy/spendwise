import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "../../utils/cn";
import { COLORS } from "../../constants/colors";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	children: React.ReactNode;
	className?: string;
}

const Modal = ({ isOpen, onClose, title, children, className }: ModalProps) => {
	useEffect(() => {
		if (!isOpen) return;

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") onClose();
		};

		document.addEventListener("keydown", handleEscape);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "";
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<>
			<div
				onClick={onClose}
				className="fixed inset-0 z-[998] bg-black/40 backdrop-blur-sm"
			/>

			<div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
				<div
					className={cn(
						"w-full max-w-md rounded-xl border shadow-xl",
						COLORS.cardBg,
						COLORS.cardBorder,
						className
					)}
					onClick={(event) => event.stopPropagation()}
				>
					<div className="flex items-center justify-between border-b px-6 py-4 dark:border-slate-800">
						{title ? (
							<h2 className={cn("text-lg font-semibold", COLORS.textPrimary)}>
								{title}
							</h2>
						) : (
							<span />
						)}

						<button
							type="button"
							onClick={onClose}
							className="rounded-lg p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
							aria-label="Close modal"
						>
							<X size={20} />
						</button>
					</div>

					<div className="p-6">{children}</div>
				</div>
			</div>
		</>,
		document.body
	);
};

export default Modal;