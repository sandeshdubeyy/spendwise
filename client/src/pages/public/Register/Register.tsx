import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { useTheme } from "../../../context/Theme.context";

import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import { Card } from "../../../components/common/Card";
import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import { ROUTES } from "../../../constants/routes";
import { useAuth } from "../../../context/Auth.context";

import lightAuth from "../../../assets/images/lightAuth.png";
import darkAuth from "../../../assets/images/darkAuth.png";


type RegisterFormValues = {
    name: string;
    email: string;
    password: string;
};

const Register = () => {
    const { theme } = useTheme();
    const [showPassword, setShowPassword] = useState(false);
    const { register: registerUser } = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            await registerUser(data);
            toast.success("Account created successfully!");
            navigate(ROUTES.DASHBOARD, { replace: true });
        } catch (error: unknown) {
            const message =
                axios.isAxiosError(error) && error.response?.data?.message
                    ? error.response.data.message
                    : "Registration failed. Please try again.";
            toast.error(message);
        }
    };

    return (
        <div className={cn("min-h-screen", COLORS.pageBg)}>
            <div className="mx-auto flex min-h-screen max-w-7xl justify-center px-4 py-10 sm:px-6 lg:px-8">
                <div className="grid w-full overflow-hidden rounded-[32px] border shadow-[0_30px_80px_-35px_rgba(0,0,0,0.35)] lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="flex items-center justify-center bg-white/90 px-6 py-10 sm:px-8 lg:px-12 dark:bg-slate-950/90">
                        <div className="w-full max-w-md">
                            <div className="mb-8 flex-col">
                                <p
                                    className={cn(
                                        "flex justify-center text-sm font-semibold uppercase tracking-[0.3em]",
                                        COLORS.income
                                    )}
                                >
                                    Create account
                                </p>
                                <h1
                                    className={cn(
                                        "mt-3 text-3xl font-bold sm:text-4xl",
                                        COLORS.textBrand
                                    )}
                                >
                                    Get started with SpendWise
                                </h1>
                                <p
                                    className={cn(
                                        "mt-3 text-sm leading-7",
                                        COLORS.textSecondary
                                    )}
                                >
                                    Create your account and start tracking money
                                    with clarity.
                                </p>
                            </div>

                            <Card className="w-100 rounded-none border-none bg-transparent p-0 shadow-none">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="space-y-5 dark:bg-slate-950/90"
                                >
                                    <Input
                                        label="Full name"
                                        placeholder="Enter your full name"
                                        className="border-1"
                                        {...register("name", {
                                            required: "Name is required",
                                            minLength: {
                                                value: 2,
                                                message:
                                                    "Name must be at least 2 characters",
                                            },
                                        })}
                                        error={errors.name?.message}
                                    />

                                    <Input
                                        label="Email"
                                        type="email"
                                        placeholder="Enter your email"
                                        className="border-1"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: "Enter a valid email",
                                            },
                                        })}
                                        error={errors.email?.message}
                                    />

                                    <div className="relative">
                                        <Input
                                            label="Password"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            placeholder="Create a password"
                                            className="border-1"
                                            {...register("password", {
                                                required:
                                                    "Password is required",
                                                minLength: {
                                                    value: 6,
                                                    message:
                                                        "Password must be at least 6 characters",
                                                },
                                            })}
                                            error={errors.password?.message}
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword((prev) => !prev)
                                            }
                                            className="absolute right-3 top-10 rounded-md text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        isLoading={isSubmitting}
                                    >
                                        Create account
                                        <ArrowRight size={16} />
                                    </Button>
                                </form>
                            </Card>

                            <p className={cn("mt-6 text-sm", COLORS.textSecondary)}>
                                Already have an account?{" "}
                                <Link
                                    to={ROUTES.LOGIN}
                                    className={cn("font-semibold", COLORS.link)}
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="relative hidden min-h-[420px] items-center justify-center overflow-hidden bg-slate-100 p-4 lg:flex dark:bg-slate-900">
                        <div className="absolute inset-0 rounded-[32px] b" />
                        <div className="relative z-10 flex h-full w-full items-center justify-center rounded-[24px] border border-dashed border-slate-300 bg-white/60 text-center shadow-inner dark:border-slate-700 dark:bg-slate-800/60">
                            <div className="h-full w-full">
                                <img
                                    src={theme === "dark" ? darkAuth : lightAuth}
                                    alt="image"
                                    className="h-full w-full rounded-3xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;