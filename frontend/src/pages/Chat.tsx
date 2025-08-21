import { useParams } from "react-router-dom";

export default function Chat() {
    const { convoId } = useParams();

    return (
        // <div className="h-screen flex flex-col">
        //     <div className="flex-1 overflow-y-auto p-4 space-y-4">
        //         {messages.map(msg => (
        //             <div key={msg.id} className={`chat ${msg.isMine ? "chat-end" : "chat-start"}`}>
        //                 <div className="chat-image avatar">
        //                     <img src="/avatar.png" alt="avatar" className="w-8 h-8 rounded-full" />
        //                 </div>
        //                 <div className="chat-header">
        //                     {msg.sender.username}
        //                     <time className="text-xs opacity-50 ml-1">{new Date(msg.created_at).toLocaleTimeString()}</time>
        //                 </div>
        //                 <div className="chat-bubble">{msg.content}</div>
        //                 {msg.attachments?.length > 0 && (
        //                     <div className="text-xs opacity-70 mt-1">
        //                         {msg.attachments.map(att => (
        //                             <div key={att.id}>{att.original_name} ({(att.size_bytes/1024).toFixed(1)} KB)</div>
        //                         ))}
        //                     </div>
        //                 )}
        //             </div>
        //         ))}
        //     </div>

        //     <div className="p-4 border-t flex gap-2">
        //         <input type="text" className="input input-bordered flex-1" placeholder="Type a message..."/>
        //         <input type="file" className="file-input file-input-neutral"/>
        //         <button className="btn btn-primary">Send</button>
        //     </div>
        // </div>

        <div className="max-w-2xl mx-auto h-[80vh] flex flex-col">
        <div className="flex-1 overflow-y-auto border rounded p-4 space-y-2">
          <div className="chat chat-start">
            <div className="chat-bubble">Hello! {convoId}</div>
          </div>
          <div className="chat chat-end">
            <div className="chat-bubble">Hi there!</div>
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <input type="text" placeholder="Type a message..." className="input input-bordered flex-1" />
          <button className="btn btn-primary">Send</button>
        </div>
      </div>
    )
}