import { Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "../layouts/Dashboard.layouts";
import Dashboard from "../pages/private/Dashboard/Dashboard";
import { ROUTES } from "../constants/routes";

/**
 * Note: this file defines the protected nested routes.
 * You can import and mount these routes from your main router once auth is implemented.
 */
const ProtectedRoutes = () => {
  return (
    <Routes>
      <Route path={ROUTES.DASHBOARD} element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        {/* Add additional child routes nested under /dashboard here */}
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
    </Routes>
  );
};

export default ProtectedRoutes;