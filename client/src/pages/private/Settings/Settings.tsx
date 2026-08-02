import { useState, type FormEvent } from "react";
import { Card, CardHeader, CardBody } from "../../../components/common/Card";
import Modal from "../../../components/common/Modal";
import Input from "../../../components/common/Input";
import Button from "../../../components/common/Button";
import { cn } from "../../../utils/cn";
import { COLORS } from "../../../constants/colors";
import { useTheme } from "../../../context/Theme.context";
import { useAuth } from "../../../context/Auth.context";
import { updateProfile, changePassword } from "../../../services/auth.services";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pencil, Sun, Moon, ArrowLeft, User as UserIcon } from "lucide-react";
import PromptCard from "../../../components/common/PromptCard";
import { ROUTES } from "../../../constants/routes";

type ModalType = "name" | "email" | "password" | null;

const Settings = () => {
    const { theme, toggleTheme } = useTheme();
    const { user, refreshCurrentUser } = useAuth();

    const [openModal, setOpenModal] = useState<ModalType>(null);
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [passwordForm, setPasswordForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);
    const navigate = useNavigate();

    const getErrorMessage = (error: unknown, fallback: string) =>
        axios.isAxiosError(error) && error.response?.data?.message
            ? error.response.data.message
            : fallback;

    const openNameModal = () => {
        setNameInput(user?.name ?? "");
        setFormError(null);
        setOpenModal("name");
    };

    const openEmailModal = () => {
        setEmailInput(user?.email ?? "");
        setFormError(null);
        setOpenModal("email");
    };

    const openPasswordModal = () => {
        setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setFormError(null);
        setOpenModal("password");
    };

    const handleNameSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (!nameInput.trim()) {
            setFormError("Please enter a name.");
            return;
        }

        try {
            setIsSubmitting(true);
            await updateProfile({ name: nameInput.trim() });
            await refreshCurrentUser();
            toast.success("Name updated successfully!");
            setOpenModal(null);
        } catch (error) {
            setFormError(getErrorMessage(error, "Couldn't update your name. Please try again."));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (!emailInput.trim()) {
            setFormError("Please enter an email.");
            return;
        }

        try {
            setIsSubmitting(true);
            await updateProfile({ email: emailInput.trim() });
            await refreshCurrentUser();
            toast.success("Email updated successfully!");
            setOpenModal(null);
        } catch (error) {
            setFormError(getErrorMessage(error, "Couldn't update your email. Please try again."));
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setFormError(null);

        if (!passwordForm.currentPassword) {
            setFormError("Please enter your current password.");
            return;
        }

        if (passwordForm.newPassword.length < 6) {
            setFormError("New password must be at least 6 characters.");
            return;
        }

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setFormError("New passwords do not match.");
            return;
        }

        try {
            setIsSubmitting(true);
            await changePassword({
                currentPassword: passwordForm.currentPassword,
                newPassword: passwordForm.newPassword,
            });
            toast.success("Password changed successfully!");
            setOpenModal(null);
        } catch (error) {
            setFormError(getErrorMessage(error, "Couldn't change your password. Please try again."));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
                <button
                    type="button"
                    onClick={() => navigate(ROUTES.DASHBOARD)}
                    className={cn(
                        "mb-4 inline-flex items-center gap-2 text-sm font-medium transition-colors mt-5 ml-5",
                        COLORS.link
                    )}
                >
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </button>
            <div className="mx-auto w-full max-w-2xl h-500px">
                <div className="mb-6">
                    <h1 className={cn("text-2xl font-bold", COLORS.textPrimary)}>Settings</h1>
                    <p className={cn("mt-1 text-sm", COLORS.textSecondary)}>
                        Manage your appearance and account details.
                    </p>
                </div>

                <div className="max-h-[calc(100vh-220px)] space-y-6 overflow-y-auto scrollbar-hide pb-2">

                    {/* Theme */}
                    <Card>
                        <CardHeader>
                            <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Appearance</h3>
                        </CardHeader>
                        <CardBody>
                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => theme !== "light" && toggleTheme()}
                                    className={cn(
                                        "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
                                        theme === "light"
                                            ? cn(COLORS.primaryBtn, "border-transparent")
                                            : cn(COLORS.cardBorder, COLORS.textSecondary, "hover:bg-slate-50 dark:hover:bg-slate-800")
                                    )}
                                >
                                    <Sun size={16} />
                                    Light
                                </button>

                                <button
                                    type="button"
                                    onClick={() => theme !== "dark" && toggleTheme()}
                                    className={cn(
                                        "flex flex-1 items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm font-medium transition-colors",
                                        theme === "dark"
                                            ? cn(COLORS.primaryBtn, "border-transparent")
                                            : cn(COLORS.cardBorder, COLORS.textSecondary, "hover:bg-slate-50 dark:hover:bg-slate-800")
                                    )}
                                >
                                    <Moon size={16} />
                                    Dark
                                </button>
                            </div>
                        </CardBody>
                    </Card>


                    {/* Account details */}
                    <Card className="mt-6">
                        <CardHeader>
                            <h3 className={cn("text-base font-semibold", COLORS.textPrimary)}>Account Details</h3>
                        </CardHeader>
                        <CardBody className="space-y-1">
                            <div className={cn("flex items-center justify-between border-b py-3", COLORS.cardBorder)}>
                                <div>
                                    <p className={cn("text-xs uppercase tracking-wide", COLORS.textMuted)}>Name</p>
                                    <p className={cn("mt-1 text-sm font-medium capitalize", COLORS.textPrimary)}>
                                        {user?.name}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={openNameModal}
                                    className="rounded p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                    aria-label="Edit name"
                                >
                                    <Pencil size={16} className={COLORS.textMuted} />
                                </button>
                            </div>

                            <div className={cn("flex items-center justify-between border-b py-3", COLORS.cardBorder)}>
                                <div>
                                    <p className={cn("text-xs uppercase tracking-wide", COLORS.textMuted)}>Email</p>
                                    <p className={cn("mt-1 text-sm font-medium", COLORS.textPrimary)}>
                                        {user?.email}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={openEmailModal}
                                    className="rounded p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                    aria-label="Edit email"
                                >
                                    <Pencil size={16} className={COLORS.textMuted} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <div>
                                    <p className={cn("text-xs uppercase tracking-wide", COLORS.textMuted)}>Password</p>
                                    <p className={cn("mt-1 text-sm font-medium tracking-widest", COLORS.textPrimary)}>
                                        ••••••••
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={openPasswordModal}
                                    className="rounded p-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                                    aria-label="Change password"
                                >
                                    <Pencil size={16} className={COLORS.textMuted} />
                                </button>
                            </div>
                        </CardBody>
                    </Card>
                    <PromptCard
                        title="Want to see your profile?"
                        description="View your name, email, and account overview."
                        buttonLabel="Go to Profile"
                        to={ROUTES.PROFILE}
                        icon={<UserIcon size={20} className={COLORS.income} />}
                    />
                </div>

                {/* Edit name modal */}
                <Modal isOpen={openModal === "name"} onClose={() => setOpenModal(null)} title="Edit Name">
                    <form onSubmit={handleNameSubmit} className="space-y-4">
                        {formError ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                                {formError}
                            </div>
                        ) : null}

                        <Input
                            label="Name"
                            value={nameInput}
                            onChange={(event) => setNameInput(event.target.value)}
                            required
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="secondary" onClick={() => setOpenModal(null)}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isSubmitting}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Edit email modal */}
                <Modal isOpen={openModal === "email"} onClose={() => setOpenModal(null)} title="Edit Email">
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                        {formError ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                                {formError}
                            </div>
                        ) : null}

                        <Input
                            label="Email"
                            type="email"
                            value={emailInput}
                            onChange={(event) => setEmailInput(event.target.value)}
                            required
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="secondary" onClick={() => setOpenModal(null)}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isSubmitting}>
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </Modal>

                {/* Change password modal */}
                <Modal isOpen={openModal === "password"} onClose={() => setOpenModal(null)} title="Change Password">
                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        {formError ? (
                            <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-300">
                                {formError}
                            </div>
                        ) : null}

                        <Input
                            label="Current Password"
                            type="password"
                            value={passwordForm.currentPassword}
                            onChange={(event) =>
                                setPasswordForm((prev) => ({ ...prev, currentPassword: event.target.value }))
                            }
                            required
                        />

                        <Input
                            label="New Password"
                            type="password"
                            value={passwordForm.newPassword}
                            onChange={(event) =>
                                setPasswordForm((prev) => ({ ...prev, newPassword: event.target.value }))
                            }
                            required
                        />

                        <Input
                            label="Confirm New Password"
                            type="password"
                            value={passwordForm.confirmPassword}
                            onChange={(event) =>
                                setPasswordForm((prev) => ({ ...prev, confirmPassword: event.target.value }))
                            }
                            required
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <Button type="button" variant="secondary" onClick={() => setOpenModal(null)}>
                                Cancel
                            </Button>
                            <Button type="submit" isLoading={isSubmitting}>
                                Update Password
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default Settings;