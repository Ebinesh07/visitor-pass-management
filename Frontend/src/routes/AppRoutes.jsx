import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Employee from "../pages/employee/Employee";
import Visitor from "../pages/visitor/Visitor";
import Reports from "../pages/reports/Reports";
import History from "../pages/history/History";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Employees */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Employee />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Visitors */}
      <Route
        path="/visitors"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Visitor />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* History */}
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <MainLayout>
              <History />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Default Redirect */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  );
};

export default AppRoutes;