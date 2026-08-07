import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import HabitsPage from "./pages/HabitsPage";
import DietPage from "./pages/DietPage";
import ExpensesPage from "./pages/ExpensesPage";
import JournalPage from "./pages/JournalPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import ProfilePage from "./pages/ProfilePage";
import { useAuthStore } from "./store/authStore";
import ChatPage from "./pages/ChatPage";

function App() {
    const token = useAuthStore((state) => state.token);

    const protect = (element: React.ReactElement) =>
        token ? element : <Navigate to="/login" replace />;

    return (
        <BrowserRouter>
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Protected Routes */}
                <Route path="/dashboard" element={protect(<DashboardPage />)} />
                <Route path="/habits" element={protect(<HabitsPage />)} />
                <Route path="/diet" element={protect(<DietPage />)} />
                <Route path="/expenses" element={protect(<ExpensesPage />)} />
                <Route path="/journal" element={protect(<JournalPage />)} />
                <Route path="/analytics" element={protect(<AnalyticsPage />)} />
                <Route path="/chat" element={protect(<ChatPage />)} />
                <Route path="/profile" element={protect(<ProfilePage />)} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
