import { Link, NavLink } from "react-router-dom";

export default function NavBar() { //{ user }: { user: any }
    const user = {
        avatar: "https://i.pravatar.cc/160",
        username: "johndoe",
        email: "john@example.com",
        created_at: "2025-08-20",
    };

    if (!user) return null;

    return (

        <nav className="navbar bg-base-100 shadow-md sticky top-0 z-40 flex flex-row px-4 py-2">
            <div className="flex items-center">
                <Link to="/chats" className="btn btn-ghost normal-case text-xl px-2 mx-10">
                    <img src="/logo.png" alt="logo" className="w-8 h-8 mr-2" />
                    <span>MyChat</span>
                </Link>
            </div>

            <div className="h-full flex-grow flex justify-center items-center">
                <div className="h-full flex items-center tabs tabs-xl tabs-border">
                    <NavLink to="/chats" className={({ isActive }) =>
                        `tab text-2xl mx-1 hover:bg-blue-100 rounded-lg transition-all duration-200 ${isActive ? 'tab-active' : ''}` 
                    }>Chats</NavLink>
                    <NavLink to="/users" className={({ isActive }) =>
                        `tab text-2xl mx-1 hover:bg-blue-100 rounded-lg transition-all duration-200 ${isActive ? 'tab-active' : ''}`
                    }>Users</NavLink>
                </div>
            </div>

            <div className="ml-4">
                <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 rounded-full p-2 transition-all duration-200">
                    <div className="avatar avatar-online">
                        <div className="w-16 h-16 rounded-full">
                            <img src={user.avatar} />
                        </div>
                    </div>
                    <div>
                        <div className="font-semibold text-xl">{user.username}</div>
                        <div className="text-xs">{user.email}</div>
                        <div className="text-xs opacity-60">Since {new Date(user.created_at).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
        </nav>

        // <div className="navbar bg-base-100 shadow">
        //     <div className="flex-1">
        //         <Link to="/chats" className="btn btn-ghost normal-case text-xl">
        //             <img src="/logo.png" alt="logo" className="w-8 h-8 mr-2" />
        //             MyChat
        //         </Link>
        //     </div>

        //     <div className="flex-none">
        //         <div className="tabs">
        //             <NavLink to="/chats" className="tab">Chats</NavLink>
        //             <NavLink to="/users" className="tab">Users</NavLink>
        //         </div>
        //     </div>

        //     <div className="flex-none ml-4">
        //         <div className="flex items-center gap-2">
        //             <img src="/avatar.png" className="w-8 h-8 rounded-full" />
        //             <div>
        //                 <div>{user.username}</div>
        //                 <div className="text-xs opacity-60">{user.email}</div>
        //                 <div className="text-xs opacity-60">Since {new Date(user.created_at).toLocaleDateString()}</div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    )
}