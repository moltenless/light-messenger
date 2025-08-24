import { create } from "zustand"
import api from "../api/api"

interface User {
    id: string;
    username: string;
    email: string;
    created_at: string;
}

interface AuthState {
    user: User | null
    token: string | null
    login: (username: string, password: string) => Promise<void>
    register: (username: string, email: string, password: string) => Promise<void>
    logout: () => void,
    fetchMe: () => Promise<void>
}

export const useAuthStore = create<AuthState>(
    (set) => ({
        user: JSON.parse(localStorage.getItem("user")!),
        token: localStorage.getItem("token"),
        login: async (username, password) => {
            const res = await api.post("/auth/login", { username, password })
            const token = res.data.tokens.access
            const user = res.data.user
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            set({ token: token })
            set({ user: user })
        },
        register: async (username, email, password) => {
            const res = await api.post("/auth/register", { username, email, password })
            const token = res.data.tokens.access
            const user = res.data.user
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            set({ token: token })
            set({ user: user })
        },
        logout: () => {
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            set({ user: null, token: null })
        },
        fetchMe: async () => {
            try {
                const res = await api.get("/users/me")
                set({ user: res.data })
            } catch {
                set({ user: null, token: null })
                localStorage.removeItem("token")
                localStorage.removeItem("user")
            }
        }
    })
)