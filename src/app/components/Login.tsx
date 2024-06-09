"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { setToken } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/login`,
        {
          username: username,
          password: password,
          expiresInMins: 30,
        }
      );

      if (response.status === 200) {
        const token = response.data.token;
        setToken(token);
        localStorage.setItem("token", token);
        setLoading(false);
        router.push("/articles");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error during login:", err);
        setError("Login failed. Please check your username and password.");
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Login</h2>
        {error && (
          <div className="mb-4 text-red-600 border border-red-600 p-2 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="emilys"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border rounded bg-gray-50"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="emilyspass"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border rounded bg-gray-50"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-blue-600 text-white rounded ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
            }`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
