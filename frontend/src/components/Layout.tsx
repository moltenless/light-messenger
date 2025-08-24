import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

export default function Layout() { //{ user }: { user: any }
    const user = {
        avatar: "https://i.pravatar.cc/40",
        username: "johndoe",
        email: "john@example.com",
        created_at: "2023-02-01",
    };

    if (!user) return null;

    return (
        <div className="w-full h-full">
            <NavBar />

            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}