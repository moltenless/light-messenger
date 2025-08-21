import { Link } from "react-router-dom";

const users = [
  { id: "1", username: "alice", email: "alice@example.com", created_at: "2023-01-10" },
  { id: "2", username: "bob", email: "bob@example.com", created_at: "2023-02-15" },
];

export default function Users(){
    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl mb-4">Users</h2>
            <ul className="space-y-3">
                {users.map(u => (
                    <li key={u.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-base-200">
                        <div>
                            <div className="font-bold">{u.username}</div>
                            <div className="text-sm opacity-70">{u.email}</div>
                        </div>
                        <Link to={`/chats/${u.id}`} className="btn btn-sm btn-primary">Message</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}