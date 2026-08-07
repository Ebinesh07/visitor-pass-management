import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import Dashboard from "../pages/dashboard/Dashboard";
import Employee from "../pages/employee/Employee";
import Visitor from "../pages/visitor/Visitor";
import Reports from "../pages/reports/Reports";
import History from "../pages/history/History";

import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import VisitorRequests from "../pages/employee/VisitorRequests";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard - All Logged In Users */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute
            roles={[
              "admin",
              "receptionist",
              "employee",
            ]}
          >
            <Route
  path="/visitor-requests"
  element={
    <ProtectedRoute roles={["employee"]}>
      <MainLayout>
        <VisitorRequests />
      </MainLayout>
    </ProtectedRoute>
  }
/>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Employees - Admin Only */}
      <Route
        path="/employees"
        element={
          <ProtectedRoute
            roles={["admin"]}
          >
            <MainLayout>
              <Employee />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Visitors - Admin & Receptionist */}
      <Route
        path="/visitors"
        element={
          <ProtectedRoute
            roles={[
              "admin",
              "receptionist",
            ]}
          >
            <MainLayout>
              <Visitor />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Reports - Admin Only */}
      <Route
        path="/reports"
        element={
          <ProtectedRoute
            roles={["admin"]}
          >
            <MainLayout>
              <Reports />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* History - Admin & Receptionist */}
      <Route
        path="/history"
        element={
          <ProtectedRoute
            roles={[
              "admin",
              "receptionist",
            ]}
          >
            <MainLayout>
              <History />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Invalid URL */}
      <Route
        path="*"
        element={
          <ProtectedRoute
            roles={[
              "admin",
              "employee",
              "receptionist",
            ]}
            
          >
            <MainLayout>
              <div className="text-center py-5">
                <h2>404</h2>
                <p>
                  Page Not Found
                </p>
              </div>
            </MainLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;