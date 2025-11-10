"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaSearch, FaPlus } from "react-icons/fa";
import axios from "axios";
import Api from "@/app/api";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface NewUser {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default function UserControl() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState<NewUser>({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });
  const [loading, setLoading] = useState(true);



    const fetchUsers = async () => { 
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get<User[]>(Api.API_BASE_URL + "/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Kullanıcılar çekilemedi:", err);
      } finally {
        setLoading(false);
      }
    };

   useEffect(() => {
    fetchUsers();
  }, []);



  // Yeni kullanıcı ekle
  const createUser = async () => {
     const token = localStorage.getItem("token");

    if (!token) return;
    try {
      await axios.post(Api.API_BASE_URL + "/auth/register", newUser, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsAddModalOpen(false);
      setNewUser({ name: "", email: "", password: "", role: "Employee" });
      // Listeyi yenile
      const res = await axios.get<User[]>(Api.API_BASE_URL + "/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Kullanıcı güncelle
  const updateUser = async () => {
     const token = localStorage.getItem("token");

    if (!token || !selectedUser) return;
    try {
      await axios.put(
        Api.API_BASE_URL + `/users/${selectedUser.id}`,
        selectedUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUsers(users.map((u) => (u.id === selectedUser.id ? selectedUser : u)));
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Kullanıcı sil
  const deleteUser = async () => {
     const token = localStorage.getItem("token");

    if (!token || !selectedUser) return;
    try {
      await axios.delete(Api.API_BASE_URL + `/users/${selectedUser.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setSelectedUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-500">
        Kullanıcılar yükleniyor...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 text-black h-screen overflow-y-auto">
      <div className="bg-white p-4 rounded-xl shadow mb-6 border-l-4 border-gray-500 flex justify-between items-center">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Kullanıcı Yönetimi</h2>
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-600"
              placeholder="Kullanıcı ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <button
          className="ml-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setIsAddModalOpen(true)}
        >
          <FaPlus /> Ekle
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl border-l-4 border-gray-500 shadow p-4 flex flex-col items-center cursor-pointer hover:shadow-lg transition"
            onClick={() => setSelectedUser(user)}
          >
            <img src="/images/person.png" width={200} />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.role}</p>
          </div>
        ))}
      </div>

      {/* Kullanıcı düzenleme modalı */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl p-6 z-50 rounded-l-xl flex flex-col"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setSelectedUser(null)}
            >
              <FaTimes size={22} />
            </button>

            <h4 className="font-semibold text-lg mt-8">Kullanıcı Bilgileri</h4>

            <label className="text-sm text-gray-600 mt-3">İsim</label>
            <input
              type="text"
              className="border rounded-lg p-2 mb-3 w-full"
              value={selectedUser.name}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, name: e.target.value })
              }
            />

            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="border rounded-lg p-2 mb-3 w-full"
              value={selectedUser.email}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, email: e.target.value })
              }
            />

            <label className="text-sm text-gray-600">Rol</label>
            <select
              className="border rounded-lg p-2 mb-3 w-full"
              value={selectedUser.role}
              onChange={(e) =>
                setSelectedUser({ ...selectedUser, role: e.target.value })
              }
            >
              <option value="Admin">Admin</option>
              <option value="Storekeeper">Storekeeper</option>
              <option value="Employee">Employee</option>
            </select>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg mt-3"
              onClick={updateUser}
            >
              Kaydet
            </button>

            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg mt-auto"
              onClick={deleteUser}
            >
              Sil
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Yeni kullanıcı ekleme modalı */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 right-0 w-80 h-full bg-white shadow-xl p-6 z-50 rounded-l-xl flex flex-col"
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setIsAddModalOpen(false)}
            >
              <FaTimes size={22} />
            </button>

            <h4 className="font-semibold text-lg mt-8">Yeni Kullanıcı Ekle</h4>

            <label className="text-sm text-gray-600 mt-3">İsim</label>
            <input
              type="text"
              className="border rounded-lg p-2 mb-3 w-full"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />

            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              className="border rounded-lg p-2 mb-3 w-full"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />

            <label className="text-sm text-gray-600">Parola</label>
            <input
              type="password"
              className="border rounded-lg p-2 mb-3 w-full"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />

            <label className="text-sm text-gray-600">Rol</label>
            <select
              className="border rounded-lg p-2 mb-3 w-full"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            >
              <option value="Admin">Admin</option>
              <option value="Storekeeper">Storekeeper</option>
              <option value="Employee">Employee</option>
            </select>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg mt-3"
              onClick={createUser}
            >
              Ekle
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
