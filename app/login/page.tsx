"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/features/auth/services/authService";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login: setUser } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const user = login(username, password);

    if (!user) {
      alert("Credenziali errate");
      return;
    }

    setUser(user);
    router.push("/courses");
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-80 space-y-4 rounded bg-white p-6 shadow">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          className="w-full border p-2"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="w-full bg-blue-600 text-white p-2"
          onClick={handleLogin}
        >
          Accedi
        </button>
      </div>
    </div>
  );
}
