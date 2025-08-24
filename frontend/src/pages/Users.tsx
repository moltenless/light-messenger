import { Link } from "react-router-dom";

const users = [
    { id: "1", username: "alice", email: "alice@example.com", created_at: "2023-01-10", avatar: "https://i.pravatar.cc/40" },
    { id: "2", username: "bob", email: "bob@example.com", created_at: "2023-02-15", avatar: "https://i.pravatar.cc/39" },
];

export default function Users() {
    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl mb-4">Users</h2>
            <ul className="space-y-3">
                {users.map(u => (
                    <li key={u.id} className="group p-4 border rounded-lg flex items-center bg-cyan-100 hover:bg-cyan-200 h-24">
                        <div className="h-full">
                            <img src={u.avatar} alt="avatar" className="h-full rounded-full"/>
                        </div>
                        <div className="text-start flex-grow ml-5">
                            <div className="font-bold text-2xl">{u.username}</div>
                            <div className="text-sm  opacity-70">{u.email}</div>
                        </div>
                        <div className="group-hover:hidden flex flex-col">
                            <span className="text-sm font-thin">registered since</span>
                            <span className="font-thin">{u.created_at}</span>
                        </div>
                        <Link to={`/chats/${u.id}`} className="btn btn-lg btn-primary hidden group-hover:flex items-center justify-center text-center">Message</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}