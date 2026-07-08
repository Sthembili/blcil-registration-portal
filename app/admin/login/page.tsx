"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });

    if (res.ok) {
      window.location.href = "/admin/dashboard";
    } else {
      setError("Invalid email or password");
      setLoading(false);
    }
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('/images/church.jpeg')",
      }}
    >
      <div className="bg-white/90 max-w-md w-full rounded-2xl shadow-2xl p-8">
        <img
          src="/images/logo.jpeg"
          alt="Bread of Life Logo"
          className="w-24 h-24 object-contain mx-auto mb-4"
        />

        <h1 className="text-3xl font-bold text-center text-blue-900">
          Admin Login
        </h1>

        <p className="text-center text-gray-700 mb-6">
          Bread of Life Livingstone Registration Portal
        </p>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-black font-semibold mb-2">
              Email Address
            </label>

            <input
              name="email"
              type="email"
              required
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
            />
          </div>

          <div>
            <label className="block text-black font-semibold mb-2">
              Password
            </label>

            <input
              name="password"
              type="password"
              required
              className="w-full border border-gray-300 p-3 rounded-lg text-black"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-gray-500 text-white p-4 rounded-xl font-bold"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>
      </div>
    </main>
  );
}