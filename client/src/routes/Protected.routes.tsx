import { Routes, Route, Navigate } from "react-router-dom";
import { ROUTES } from "../constants/routes";

const ProtectedRoutes = () => {
    return (
        <Routes>
            <Route path={ROUTES.DASHBOARD} element={<div>Dashboard coming soon</div>} />
            <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
        </Routes>
    );
};

export default ProtectedRoutes;