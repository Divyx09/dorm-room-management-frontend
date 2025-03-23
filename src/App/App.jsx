import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ProtectedRoute } from "../components/ProtectedRoute";
import RootLayout from "./layouts/RootLayout";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Auth Pages
import LoginPage from "../pages/Auth/LoginPage";
import SignupPage from "../pages/Auth/Signup";
import ForgotPasswordPage from "../pages/Auth/ForgotPage";

// Main Pages
import HomePage from "../pages/Home/HomePage";
import AboutPage from "../pages/About/AboutPage";
import ContactPage from "../pages/Contact/ContactPage";
import NotFoundPage from "../pages/NotFound/NotFoundPage";

// Dashboard Pages
import TaskDashboard from "../pages/Tasks/TaskDashBoard";
import MaintenanceDashboard from "../pages/Maintainance/MaintaiananceDashBoard";
import ExpenseDashboard from "../pages/Expenses/ExpensesDashBoard";

// Admin Pages
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminUsers from "../pages/Admin/AdminUser";

// Profile Pages
import ProfilePage from "../pages/Profile/ProfilePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <div className='app-container'>
          <Navbar />
          <div className='main-content'>
            <Outlet />
          </div>
          <Footer />
        </div>
      </AuthProvider>
    ),
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      // Auth Routes
      {
        path: "auth",
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "signup",
            element: <SignupPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPasswordPage />,
          },
        ],
      },
      // Protected Routes - User Dashboard
      {
        path: "dashboard",
        element: (
          <ProtectedRoute roles={["USER", "ADMIN"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "",
            element: <Navigate to='tasks' replace />,
          },
          {
            path: "tasks",
            element: <TaskDashboard />,
          },
          {
            path: "maintenance",
            element: <MaintenanceDashboard />,
          },
          {
            path: "expenses",
            element: <ExpenseDashboard />,
          },
        ],
      },
      // Protected Routes - Admin
      {
        path: "admin",
        element: (
          <ProtectedRoute roles={["ADMIN"]}>
            <Outlet />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "users",
            element: <AdminUsers />,
          },
          {
            path: "tasks",
            element: <TaskDashboard />,
          },
          {
            path: "maintenance",
            element: <MaintenanceDashboard />,
          },
          {
            path: "expenses",
            element: <ExpenseDashboard />,
          },
        ],
      },
      // Profile Routes
      {
        path: "profile",
        element: (
          <ProtectedRoute roles={["USER", "ADMIN"]}>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
