import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

export default function Users() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [users, setUsers] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUsers = async () => {
            const { data } = await api.get("/users")
            setUsers(data)
        }
        fetchUsers()
    }, [])

    const handleOpenClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, user_id: string) => {
        event.preventDefault()
        try {
            const { data } = await api.post(`/conversations/${user_id}`)
            const convoId = data
            navigate(`/chats/${convoId}`)
        } catch(err) {
            console.error("Failed to start the chat:", err)
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl mb-4">Users</h2>
            <ul className="space-y-3">
                {users.map(u => (
                    <li key={u.id} className="group p-4 border rounded-lg flex items-center bg-cyan-100 hover:bg-cyan-200 h-24">
                        <div className="h-full">
                            <img src={`https://i.pravatar.cc/${Math.floor(Math.random() * 140 + 40)}`} alt="avatar" className="h-full rounded-full" />
                        </div>
                        <div className="text-start flex-grow ml-5">
                            <div className="font-bold text-2xl">{u.username}</div>
                            <div className="text-sm  opacity-70">{u.email}</div>
                        </div>
                        <div className="group-hover:hidden flex flex-col">
                            <span className="text-sm font-thin">registered since</span>
                            <span className="font-thin">{new Date(u.created_at).toLocaleDateString()}</span>
                        </div>
                        <button onClick={e => handleOpenClick(e, u.id)} className="btn btn-lg btn-primary hidden group-hover:flex items-center justify-center text-center">Message</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}