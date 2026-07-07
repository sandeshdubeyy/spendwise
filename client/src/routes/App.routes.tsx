import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/Public.layouts";
import Landing from "../pages/public/Landing/Landing";
import Register from "../pages/public/Register/Register";
import Login from "../pages/public/Login/Login";
import DashboardLayout from "../layouts/Dashboard.layouts";
import Dashboard from "../pages/private/Dashboard/Dashboard";
import ProtectedRoute from "./Protected.routes";
import { ROUTES } from "../constants/routes";

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public routes */}
            <Route
                path={ROUTES.HOME}
                element={
                    <PublicLayout>
                        <Landing />
                    </PublicLayout>
                }
            />

            <Route
                path={ROUTES.REGISTER}
                element={
                    <PublicLayout hideFooter>
                        <Register />
                    </PublicLayout>
                }
            />

            <Route
                path={ROUTES.LOGIN}
                element={
                    <PublicLayout hideFooter>
                        <Login />
                    </PublicLayout>
                }
            />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                    {/* Add more private pages here later */}
                </Route>
            </Route>

            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};

export default AppRoutes;