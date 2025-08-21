import { Link } from "react-router-dom"

export default function Landing() {
    return (
        <div className="h-screen flex flex-col items-center justify-center text-center">
            <img src="/logo.png" alt="logo" className="w-20 h-20 mb-4" />
            <h1 className="text-4xl font-bold mb-4">Welcome to MyChat</h1>
            <p className="mb-6">Connect, chat, and share files.</p>
            <div className="flex gap-4">
                <Link to="/register" className="btn btn-primary">Register</Link>
                <Link to="/login" className="btn btn-outline">Login</Link>
            </div>
        </div>
    )
}