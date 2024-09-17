import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import { useAuth } from "./hooks/useAuth";


const App = () => {
  const { isLogin } = useAuth();
  return (
    <BrowserRouter basename="/login-dashboard-page">
      <Routes>
        <Route
          path="/"
          element={<Navigate to={isLogin ? "/dashboard" : "/login"} />}
        />
        <Route
          path="/login"
          element={isLogin ? (<Navigate to="/dashboard" />) : (<LoginPage />)}
        />
        <Route
          path="/dashboard"
          element={isLogin ? (<DashboardPage />) : (<Navigate to="/login" />)}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
