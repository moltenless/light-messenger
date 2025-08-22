import { useState } from "react";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Login:", { username, password })
        // later: call backend POST /login
    }

    return (
        <div className="flex items-center justify-center w-full h-full bg-base-200">
            <div className="flex flex-col justify-center w-1/4 h-2/5 rounded-2xl bg-white shadow-lg p-10">
                <h1 className="text-center text-5xl font-semibold mb-6">Login</h1>
                <form onSubmit={handleSubmit} className="space-y-4 p-3 px-7">
                    <div>
                        <label htmlFor="email" className="block text-2xl font-medium text-gray-700">Username</label>
                        <input id="email" value={username} type="text" onChange={e => setUsername(e.target.value)} required 
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-center" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-2xl font-medium text-gray-700">Password</label>
                        <input id="password" value={password} type="password" onChange={e => setPassword(e.target.value)} required 
                        className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-center" />
                    </div>
                    <button type="submit" className="btn btn-secondary w-full  text-2xl text-white py-2 rounded-md hover:btn-accent">
                        Login
                    </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account? <a href="/register" className="text-blue-600 hover:underline">Register</a>
                </p>
            </div>
        </div>
    )
}