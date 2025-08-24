import { Navigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { token, user } = useAuthStore()

    if (user === undefined) {
        return <div>Loading...</div>
    }

    if (!token || !user) {
        return <Navigate to="/login" replace />
    }
    return children
}