import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/api"

export default function Chats() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [convos, setConvos] = useState<any[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        const fetchConvos = async () => {
            const { data } = await api.get("/conversations")
            setConvos(data)
        }
        fetchConvos()
    }, [])

    const handleOpenClick = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, user_id: string) => {
        event.preventDefault()
        try {
            const { data } = await api.post(`/conversations/${user_id}`)
            const convoId = data
            navigate(`/chats/${convoId}`)
        } catch (err) {
            console.error("Failed to start chat:", err)
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-8">
            <h2 className="text-2xl mb-4">Your Conversations</h2>
            <ul className="space-y-3">
                {convos.map(c => (
                    <li key={c.id} className="group p-4 border rounded-lg flex items-center bg-blue-200 hover:bg-blue-300 h-24">
                        <div className="h-full">
                            <img src={`https://i.pravatar.cc/${Math.floor(Math.random() * 140 + 40)}`} alt="avatar" className="h-full rounded-full" />
                        </div>
                        <div className="text-start flex-grow ml-5">
                            <div className="font-bold text-2xl">{c.username}</div>
                            <div className="text-sm  opacity-70">{c.email}</div>
                        </div>
                        <div className="group-hover:hidden flex flex-col">
                            <span className="text-sm font-thin">chatting since</span>
                            <span className="font-thin">{new Date(c.created_at).toLocaleDateString()}</span>
                        </div>
                        <button onClick={e => handleOpenClick(e, c.user2_id)} className="btn btn-lg btn-primary hidden group-hover:flex items-center justify-center text-center">Open</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}