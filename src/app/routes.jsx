import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import SignUp from "../pages/SignUp.jsx";
import ForgotPassword from "../pages/ForgotPassword.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import GenerateRecipe from "../pages/GenerateRecipe.jsx";
import AIResult from "../pages/AIResult.jsx";
import Explore from "../pages/Explore.jsx";
import Favorite from "../pages/Favorite.jsx";
import Profile from "../pages/Profile.jsx";
import ProtectedLayout from "../components/ProtectedLayout.jsx";

/** Public: only these paths are reachable without login. Everything else goes through ProtectedLayout. */
export const router = createBrowserRouter([
  { path: "/login", Component: Login },
  { path: "/signup", Component: SignUp },
  { path: "/forgot-password", Component: ForgotPassword },
  {
    element: <ProtectedLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "generate", element: <GenerateRecipe /> },
      { path: "ai-result", element: <AIResult /> },
      { path: "explore", element: <Explore /> },
      { path: "favorite", element: <Favorite /> },
      { path: "profile", element: <Profile /> },
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },
]);
