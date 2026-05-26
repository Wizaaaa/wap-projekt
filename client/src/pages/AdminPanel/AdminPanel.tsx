import { useState } from "react";
import AdminLogin from "../../components/Admin/AdminLogin/AdminLogin.tsx";
import AdminDashboard from "../../components/Admin/AdminDashboard/AdminDashboard.tsx";

export default function AdminPanel() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    if (!isLoggedIn) {
        return <AdminLogin onLogin={() => setIsLoggedIn(true)} />;
    }

    return <AdminDashboard />;
}