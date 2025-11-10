"use client";

import Link from "next/link";
import { FaArchive, FaPen, FaUser, FaArrowLeft, FaClone } from "react-icons/fa";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Menu() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setRole(storedRole);
  }, []);

  return (
    <div className="flex flex-col w-56 bg-gradient-to-b from-white to-gray-50 shadow-lg h-full">
      <header className="w-full h-20 flex items-center justify-center p-2 border-b border-gray-200">
        <Image
          src="/images/login.png"
          alt="Banner"
          width={200}
          height={64}
          style={{ borderRadius: 10 }}
          className="object-contain"
        />
      </header>

      <nav className="flex-1 flex flex-col mt-4 gap-1 px-2">

       
        {(role === "Employee" || role === "Storekeeper" || role === "Admin") && (
          <Link
            href="/home"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <FaArchive className="text-lg" />
            <span className="font-medium">Ürünler</span>
          </Link>
        )}

     
        {(role === "Storekeeper" || role === "Admin") && (
          <Link
            href="/home/productEdit"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <FaPen className="text-lg" />
            <span className="font-medium">Ürün İşlemleri</span>
          </Link>
        )}

        
        {(role === "Storekeeper" || role === "Admin") && (
          <Link
            href="/home/stock"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <FaClone className="text-lg" />
            <span className="font-medium">Stok Hareketleri</span>
          </Link>
        )}

     
        {role === "Admin" && (
          <Link
            href="/home/personelControl"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 transform hover:scale-105"
          >
            <FaUser className="text-lg" />
            <span className="font-medium">Kullanıcı Yetkilendirme</span>
          </Link>
        )}

       
        <Link
          href="/login"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 transform hover:scale-105"
        >
          <FaArrowLeft className="text-lg" />
          <span className="font-medium">Çıkış Yap</span>
        </Link>
      </nav>
    </div>
  );
}
