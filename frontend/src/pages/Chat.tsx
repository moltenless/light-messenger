/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import { useAuthStore } from "../state/useAuthStore";

const myAvatar = `https://i.pravatar.cc/${Math.floor(Math.random() * 140 + 40)}`;
const userAvatar = `https://i.pravatar.cc/${Math.floor(Math.random() * 140 + 40)}`;

export default function Chat() {
  const { convoId } = useParams();

  const [messages, setMessages] = useState<any[]>([])
  const [username, setUsername] = useState<string>()
  const [newContent, setNewContent] = useState("")
  const [files, setFiles] = useState<FileList | null>(null)

  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await api.get(`/messages/${convoId}`)
      setMessages(data.messages)
      setUsername(data.username)
    }
    fetchMessages()
  }, [convoId])

  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)

  const wsUrl = useMemo(
    () => `ws://localhost:8000/ws/conversations/${convoId}?token=${token}`,
    [convoId, token]
  )

  const wsRef = useRef<WebSocket | null>(null)
  useEffect(() => {
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      console.log(`WebSocket connection established at `)
    }

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data)
      const wsEvent = data.event
      if (wsEvent == 'new_message') {
        const newMessage = JSON.parse(data.data)
        setMessages(prev => [...prev, newMessage])
      }
    }

    ws.onclose = () => {
      console.log("WebSocket closed")
    }

    return () => {
      ws.close()
    }
  }, [wsUrl])

  const handleSendMessage = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (files != null && (newContent === null || newContent == "")) {
      alert("Type a message before sending files")
      e.preventDefault()
      return
    }
    if (newContent === null || newContent == "") {
      e.preventDefault()
      return
    }

    const formData = new FormData();
    formData.append("content", newContent)

    if (files) {
      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i])
      }
    }

    try {
      await api.post(`/messages/${convoId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      setNewContent("");
      setFiles(null);
    } catch (error) {
      console.error("Failed tosend message", error)
    }
  }

  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const loadAttachment = async (id: string) => {
    const response = await api.get(`/attachments/${id}`, {
      responseType: 'blob'
    });

    const disposition = response.headers['content-disposition'];
    console.log(disposition)
    let filename = 'file';
    const matches = disposition.match(/filename\*?=(?:UTF-8'')?"?([^;"\n]+)"?/i);
    if (matches && matches[1]) {
      filename = decodeURIComponent(matches[1]);
    }

    const url = window.URL.createObjectURL(new Blob([response.data]))

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click();
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url);
  }

  const deleteMessage = async (id: string) => {
    const response = await api.delete(`messages/${id}`)

    if (response.status == 204) {
      setMessages(prev => prev.filter(m => m.id != id))
    }
  }

  const editMessage = async (id: string) => {
    const response = await api.put(`messages/${id}`, { content: newContent })

    if (response.status == 204) {
      setMessages(prev => prev.map(m => m.id === id ? {...m, content: newContent} : m))
    }

    setNewContent('')
  }

  return (
    <div className="max-w-2xl h-[85vh] flex flex-col mx-auto">
      <div className="h-full overflow-y-auto border rounded p-4">
        {messages.map(msg => (
          <div className="group">

            <div key={msg.id} className={`chat ${user?.id === msg.sender_id ? "chat-end" : "chat-start"}`}>

              <div className="chat-image avatar w-8 h-8 rounded-full">
                <img src={`${user?.id === msg.sender_id ? myAvatar : userAvatar}`} alt="avatar" className="w-8 h-8 rounded-full" />
              </div>

              <div className="chat-header">
                <div className={`inline ${user?.id === msg.sender_id ? 'group-hover:hidden' : ''}`}>
                  <span className="text-sm">{user?.id === msg.sender_id ? user?.username : username}</span>
                  <time className="text-xs opacity-50 ml-1">{new Date(msg.created_at).toLocaleTimeString()}</time>
                </div>
                {msg.sender_id === user?.id && (
                  <div className="hidden group-hover:inline">
                    <span onClick={() => editMessage(msg.id)} 
                    className="ml-2 underline text-sm text-blue-800 cursor-pointer hover:font-bold">Edit</span>
                    <span onClick={() => deleteMessage(msg.id)} className="ml-2 underline text-sm text-red-800 cursor-pointer hover:font-bold">Delete</span>
                  </div>
                )}
              </div>

              <div className="chat-bubble">
                {msg.content}
              </div>

              {msg.attachments?.length > 0 && (
                <div className="chat-footer text-end block">
                  <div className={`text-xs mt-1 ${user?.id === msg.sender_id ? 'text-end' : 'text-start'} `}>
                    Attachments:
                  </div>
                  {msg.attachments.map(att => (
                    <div key={att.id} onClick={() => loadAttachment(att.id)} className={`text-xs opacity-70 underline ${user?.id === msg.sender_id ? 'text-end' : 'text-start'} cursor-pointer hover:text-blue-600 hover:font-bold`}>
                      {att.original_name} ({(att.size_bytes / 1024).toFixed(1)} KB)
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-base-300 flex flex-row border-4">
        <div className="flex-grow gap-1 p-2 flex flex-col border-r-2">
          <input value={newContent} onChange={e => setNewContent(e.target.value)} type="text" className="input input-bordered w-full" placeholder="Type a message..." />
          <input type="file" multiple onChange={e => setFiles(e.target.files)} className="file-input file-input-neutral file-input-xs w-full" />
        </div>
        <div className="h-full p-2 border-l-2">
          <button onClick={e => handleSendMessage(e)} className="btn btn-primary btn-xl w-full h-full">Send</button>
        </div>
      </div>
    </div>
  )
}