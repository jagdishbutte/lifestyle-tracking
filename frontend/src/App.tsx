import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import HabitsPage from "./pages/HabitsPage";
import GoalsPage from "./pages/GoalsPage";
import ExpensesPage from "./pages/ExpensesPage";
import JournalPage from "./pages/JournalPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import AiAssistantPage from "./pages/AiAssistantPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LandingPage />} />

                <Route path="/register" element={<RegisterPage />} />

                <Route path="/login" element={<LoginPage />} />

                <Route path="/dashboard" element={<DashboardPage />} />

                <Route path="/habits" element={<HabitsPage />} />

                <Route path="/goals" element={<GoalsPage />} />

                <Route path="/expenses" element={<ExpensesPage />} />

                <Route path="/journal" element={<JournalPage />} />

                <Route path="/analytics" element={<AnalyticsPage />} />

                <Route path="/ai" element={<AiAssistantPage />} />

                <Route path="/profile" element={<ProfilePage />} />

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
