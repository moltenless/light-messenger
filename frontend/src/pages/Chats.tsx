import { Link } from "react-router-dom"

const convos = [
    { id: "1", username: "alice", email: "alice@example.com", createdAt: "2024-01-01" },
    { id: "2", username: "bob", email: "bob@example.com", createdAt: "2024-02-02" },
]

export default function Chats(){
    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl mb-4">Your Conversations</h2>
            <ul className="space-y-3">
                {convos.map(c => (
                    <li key={c.id} className="p-4 border rounded-lg flex justify-between items-center hover:bg-base-200">
                        <div>
                            <div className="font-bold">{c.username}</div>
                            <div className="text-sm opacity-70">{c.email}</div>
                        </div>
                        <Link to={`/chats/${c.id}`} className="btn btn-sm btn-primary">Open</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}