import { Navigate, Outlet, useLocation } from "react-router-dom";
import Spinner from "../components/common/Spinner";
import { cn } from "../utils/cn";
import { COLORS } from "../constants/colors";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../context/Auth.context";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div
                className={cn(
                    "flex min-h-screen items-center justify-center",
                    COLORS.pageBg
                )}
            >
                <Spinner size="lg" className={COLORS.textBrand} />
            </div>
        );
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={ROUTES.LOGIN}
                replace
                state={{ from: location }}
            />
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;