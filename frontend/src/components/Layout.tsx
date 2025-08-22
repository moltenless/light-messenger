import { Link, NavLink, Outlet } from "react-router-dom";

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
            <nav className="navbar bg-base-100 shadow flex flex-row">
                <div className="">
                    <Link to="/chats" className="btn btn-ghost normal-case text-xl">
                        <img src="/logo.png" alt="logo" className="w-8 h-8 mr-2" />
                        MyChat
                    </Link>
                </div>

                <div className="flex-grow flex justify-center items-center">
                    <div className="tabs ">
                        <NavLink to="/chats" className="tab">Chats</NavLink>
                        <NavLink to="/users" className="tab">Users</NavLink>
                    </div>
                </div>

                <div className="ml-4">
                    <div className="flex items-center gap-2">
                        <img src={user.avatar} className="w-12 h-12 rounded-full" />
                        <div>
                            <div>{user.username}</div>
                            <div className="text-xs opacity-60">{user.email}</div>
                            <div className="text-xs opacity-60">Since {new Date(user.created_at).toLocaleDateString()}</div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )
}