import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/services/firebase";

// Pages
import Landing from "@/pages/Landing";
import Overview from "@/pages/dashboard/Overview";
import Tickets from "@/pages/dashboard/Tickets";
import Chatbots from "@/pages/dashboard/Chatbots";
import Settings from "@/pages/dashboard/Settings";
import Team from "@/pages/dashboard/Team";
import Logs from "@/pages/dashboard/Logs";
import Onboarding from "@/pages/onboarding/Onboarding";
import Login from "@/pages/auth/Login";

// Layouts
import DashboardLayout from "@/layouts/DashboardLayout";

// i18n
import "@/i18n";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-950 text-white">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-indigo-500 rounded-full"></div>
          <p className="text-sm font-mono tracking-tighter opacity-50 uppercase">Initializing SupportPilot...</p>
        </div>
      </div>
    );
  }

  const isDemo = !user;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
        
        {/* Onboarding can be started as a guest */}
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route element={<DashboardLayout isDemo={isDemo} />}>
          <Route path="/dashboard" element={<Overview />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/chatbots" element={<Chatbots />} />
          <Route path="/team" element={<Team />} />
          {/* Settings and Logs are protected for real users only */}
          <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login?redirect=settings" />} />
          <Route path="/logs" element={user ? <Logs /> : <Navigate to="/login?redirect=logs" />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
