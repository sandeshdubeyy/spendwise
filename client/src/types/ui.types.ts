import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export type Size = "sm" | "md" | "lg";

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "outline"
	| "ghost"
	| "danger";

export type BadgeVariant = "default" | "success" | "warning" | "danger";

export type StatVariant = "default" | "income" | "expense" | "savings";

export interface BaseProps {
	className?: string;
	children?: ReactNode;
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: ButtonVariant;
	size?: Size;
	isLoading?: boolean;
};

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
	label?: string;
	error?: string;
	helperText?: string;
};