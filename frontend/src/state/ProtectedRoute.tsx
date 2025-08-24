import { Navigate } from "react-router-dom";
import { useAuthStore } from "./useAuthStore";
import type { JSX } from "react";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
    const { token, user } = useAuthStore()
    const fetchMe = useAuthStore(state => state.fetchMe)
    if (!user){
        fetchMe()
    }
    const user2 = useAuthStore().user
    if (!token || (!user && !user2)) {
        console.log("in protected route func the error happaned")
        return <Navigate to="/login" replace />
    }
    return children
}