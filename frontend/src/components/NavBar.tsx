import {Link, NavLink } from "react-router-dom";

export default function NavBar() { //{ user }: { user: any }
    const user = {
        avatar: "https://i.pravatar.cc/40",
        username: "johndoe",
        email: "john@example.com",
        created_at: "2023-02-01",
      };
    
    if (!user) return null;

    return (
        <div className="navbar bg-base-100 shadow">
            <div className="flex-1">
                <Link to="/chats" className="btn btn-ghost normal-case text-xl">
                    <img src="/logo.png" alt="logo" className="w-8 h-8 mr-2" />
                    MyChat
                </Link>
            </div>

            <div className="flex-none">
                <div className="tabs">
                    <NavLink to="/chats" className="tab">Chats</NavLink>
                    <NavLink to="/users" className="tab">Users</NavLink>
                </div>
            </div>

            <div className="flex-none ml-4">
                <div className="flex items-center gap-2">
                    <img src="/avatar.png" className="w-8 h-8 rounded-full" />
                    <div>
                        <div>{user.username}</div>
                        <div className="text-xs opacity-60">{user.email}</div>
                        <div className="text-xs opacity-60">Since {new Date(user.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}