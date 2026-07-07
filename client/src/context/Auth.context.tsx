import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import api from "../services/api.services";

export type AuthUser = {
    _id: string;
    name: string;
    email: string;
};

type LoginCredentials = {
    email: string;
    password: string;
};

type RegisterCredentials = {
    name: string;
    email: string;
    password: string;
};

interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    register: (credentials: RegisterCredentials) => Promise<void>;
    logout: () => void;
    refreshCurrentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = "token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [loading, setLoading] = useState(true);

    const clearSession = useCallback(() => {
        localStorage.removeItem(TOKEN_KEY);
        setUser(null);
    }, []);

    const refreshCurrentUser = useCallback(async () => {
        const savedToken = localStorage.getItem(TOKEN_KEY);

        if (!savedToken) {
            setUser(null);
            return;
        }

        const { data } = await api.get<{ user: AuthUser }>("/auth/me");
        setUser(data.user);
    }, []);

    useEffect(() => {
        const restoreSession = async () => {
            const savedToken = localStorage.getItem(TOKEN_KEY);

            if (!savedToken) {
                setLoading(false);
                return;
            }

            try {
                await refreshCurrentUser();
            } catch {
                clearSession();
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, [clearSession, refreshCurrentUser]);

    const login = async (credentials: LoginCredentials) => {
        const { data } = await api.post<{
            token: string;
            user: AuthUser;
        }>("/auth/login", credentials);

        localStorage.setItem(TOKEN_KEY, data.token);
        await refreshCurrentUser();
    };

    const register = async (credentials: RegisterCredentials) => {
        await api.post("/auth/register", credentials);

        // Backend register does not return a token — auto-login after signup
        await login({
            email: credentials.email,
            password: credentials.password,
        });
    };

    const logout = () => {
        clearSession();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                isAuthenticated: !!user,
                login,
                register,
                logout,
                refreshCurrentUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider.");
    }

    return context;
};