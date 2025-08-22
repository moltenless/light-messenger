import { Link } from "react-router-dom"

export default function Landing() {
    return (
        <div className="h-full w-full flex flex-col items-center justify-center text-center">
            <img src="/logo.png" alt="logo" className="w-30 h-40 mb-4" />
            <h1 className="text-4xl font-bold mb-4">Welcome to MyChat</h1>
            <p className="mb-6">Connect, chat, and share files.</p>
            <div className="flex gap-4 w-3/4 justify-center">
                <Link to="/register" className="btn btn-primary btn-lg">Register</Link>
                
                <Link to="/login" className="btn btn-outline btn-lg">Login</Link>
            </div>
        </div>
    )
}