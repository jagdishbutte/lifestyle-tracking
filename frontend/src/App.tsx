import { BrowserRouter, Routes, Route } from "react-router-dom";

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
import AiAssistantPage from "./pages/AiAssistantPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

function App() {
    const initialize = useAuthStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, []);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="/habits" element={<HabitsPage />} />

                <Route path="/diet" element={<DietPage />} />

                <Route path="/expenses" element={<ExpensesPage />} />

                <Route path="/journal" element={<JournalPage />} />

                <Route path="/analytics" element={<AnalyticsPage />} />

                <Route path="/ai" element={<AiAssistantPage />} />

                <Route path="/profile" element={<ProfilePage />} />

                <Route path="/settings" element={<SettingsPage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
