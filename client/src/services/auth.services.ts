import api from "./api.services";

export type AuthUser = {
    _id: string;
    name: string;
    email: string;
};

export const getCurrentUser = async () => {
    const { data } = await api.get<{ user: AuthUser; }>("api/auth/me");
    return data.user;
};

export const updateProfile = async (payload: { name?: string; email?: string; }) => {
    const { data } = await api.put<{ message: string; user: AuthUser; }>("/auth/profile", payload);
    return data.user;
};

export const changePassword = async (payload: { currentPassword: string; newPassword: string; }) => {
    const { data } = await api.put<{ message: string; }>("/auth/change-password", payload);
    return data.message;
};