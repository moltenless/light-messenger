import { useParams } from "react-router-dom";

export default function Chat() {
  const { convoId } = useParams();
  const messages = [
    {
      id: "1", isMine: true, sender: { username: "Vasya", avatar: "https://i.pravatar.cc/40" }, created_at: '2025-08-25', content: "Hey, long time no see", attachments: [{ length: 1024, id: '1', original_name: "picture_of_me.png", size_bytes: 2048 }]
    },
    {
      id: "1", isMine: false, sender: { username: "Vasya", avatar: "https://i.pravatar.cc/39" }, created_at: '2025-08-25', content: "Hey, long time no see", attachments: [{ length: 1024, id: '1', original_name: "picture_of_jjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjme.png", size_bytes: 2048 }, { length: 1024, id: '1', original_name: "small file.png", size_bytes: 2048 }]
    },
    {
      id: "1", isMine: true, sender: { username: "Vasya", avatar: "https://i.pravatar.cc/41" }, created_at: '2025-08-25', content: "Hey, long time no see", attachments: [{ length: 1024, id: '1', original_name: "picture_of_me.png", size_bytes: 2048 }]
    }
  ]

  return (
    <div className="max-w-2xl h-[85vh] flex flex-col mx-auto">
      <div className="h-full overflow-y-auto border rounded p-4 space-y-4">
        {messages.map(msg => (
          <div className="group">

            <div key={msg.id} className={`chat ${msg.isMine ? "chat-end" : "chat-start"}`}>

              <div className="chat-image avatar">
                <img src={msg.sender.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
              </div>

              <div className="chat-header">
                <div className="inline group-hover:hidden">
                  <span>{msg.sender.username}</span>
                  <time className="text-xs opacity-50 ml-1">{new Date(msg.created_at).toLocaleTimeString()}</time>
                </div>
                <div className="hidden group-hover:inline">
                  <span className="ml-2 underline text-sm text-blue-800 cursor-pointer hover:font-bold">Edit</span>
                  <span className="ml-2 underline text-sm text-red-800 cursor-pointer hover:font-bold">Delete</span>
                </div>
              </div>

              <div className="chat-bubble">
                {msg.content}
              </div>

              {msg.attachments?.length > 0 && (
                <div className="chat-footer text-end block">
                  <div className={`text-xs mt-1 ${msg.isMine ? 'text-end' : 'text-start'} `}>
                    Attachments:
                  </div>
                  {msg.attachments.map(att => (
                    <div key={att.id} className={`text-xs opacity-70 underline ${msg.isMine ? 'text-end' : 'text-start'} cursor-pointer hover:text-blue-600 hover:font-bold`}>
                      {att.original_name} ({(att.size_bytes / 1024).toFixed(1)} KB)
                    </div>
                  ))}
                </div>
              )}

            </div>
          </div>
        ))}
      </div>

      <div className="bg-base-300 flex flex-row border-4">
        <div className="flex-grow gap-1 p-2 flex flex-col border-r-2">
          <input type="text" className="input input-bordered w-full" placeholder="Type a message..." />
          <input type="file" multiple className="file-input file-input-neutral file-input-xs w-full" />
        </div>
        <div className="h-full p-2 border-l-2">
          <button className="btn btn-primary btn-xl w-full h-full">Send</button>
        </div>
      </div>
    </div>
  )
}