import { useState } from "react"

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Register:", { username, email, password })
        // later: call backend POST /register
    }

    return (
        <div className="flex items-center justify-center w-full h-full bg-base-200">
            <div className="flex flex-col justify-center w-1/4 h-1/2 rounded-2xl bg-white shadow-lg p-10">
                <h1 className="text-center text-5xl font-semibold mb-6">Register</h1>

                <form onSubmit={handleSubmit} className="space-y-4 p-3 px-7">
                    <div>
                        <label htmlFor="username" className="block text-2xl font-medium text-gray-700">
                            Username
                        </label>
                        <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-center" />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-2xl font-medium text-gray-700">Email</label>
                        <input
                            id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-center" />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-2xl font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required
                            className="mt-1 block w-full rounded-md border border-gray-300 p-2 text-center" />
                    </div>

                    <button
                        type="submit" className="w-full btn btn-primary text-white text-2xl py-2 rounded-md hover:btn-neutral">
                        Register
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    )
}