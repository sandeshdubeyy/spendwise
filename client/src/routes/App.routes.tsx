import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../layouts/Public.layouts";
import Landing from "../pages/public/Landing/Landing";
import Register from "../pages/public/Register/Register";
import { ROUTES } from "../constants/routes";
import Login from "../pages/public/Login/Login";

const AppRoutes = () => {
    return (
        <Routes>
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
                    <PublicLayout>
                        <Register />
                    </PublicLayout>
                }
            />

            <Route
                path={ROUTES.LOGIN}
                element={
                    <PublicLayout>
                        <Login />
                    </PublicLayout>
                }
            />

            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
        </Routes>
    );
};

export default AppRoutes;