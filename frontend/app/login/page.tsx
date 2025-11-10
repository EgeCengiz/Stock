"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { jwtDecode} from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Api from "../api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(Api.ENDPOINTS.POST_LOGIN, {
        email,
        password,
      });
      const token = res.data.access_token;

      // Token'ı kaydet
      localStorage.setItem("token", token);

      // Token'dan rolü çıkar
      interface TokenPayload {
        name: string;
        email: string;
        role: string;
        // diğer alanlar varsa ekle
      }

      const decoded: TokenPayload = jwtDecode(token);
      localStorage.setItem("role", decoded.role);

      router.push("/home");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      alert(err.response?.data?.message || "Giriş yapılamadı");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-200 via-pink-200 to-indigo-200 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-10 border-l-8 border-gradient-to-b from-purple-500 to-pink-500">
        <img src="/images/login.png" className="mx-auto mb-6 " />

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Hoşgeldiniz
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="ornek@mail.com"
              className="border border-gray-300 text-gray-700 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-2">
              Parola
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="border border-gray-300 text-gray-700 rounded-xl px-4 py-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 text-gray-700 to-blue-500 text-white py-3 rounded-xl font-semibold text-lg hover:scale-105 transform transition duration-300 shadow-lg"
          >
            Giriş Yap
          </button>
        </form>
      </div>
    </div>
  );
}
