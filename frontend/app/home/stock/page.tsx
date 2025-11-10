"use client";

import  { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Api from "@/app/api";

interface StockLog {
  id: number;
  productId: string;
  productName: string;
  user: string;
  action: "Ekle" | "Çıkar";
  quantity: number;
  beforeStock: number;
  afterStock: number;
  date: string;
  description?: string;
}

export default function StockPage() {
  const [search, setSearch] = useState("");
  const [logs, setLogs] = useState<StockLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {  
    const token = localStorage.getItem("token");
    const fetchLogs = async () => {
  try {
    const res = await axios.get(Api.API_BASE_URL+"/stock/movements", {
      headers: { Authorization: `Bearer ${token}` },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mappedLogs: StockLog[] = res.data.map((s: any) => ({
      id: s.id,
      productId: s.productId,
      productName: s.product?.name || "Ürün Yok",
      user: s.user || "SYSTEM",
      action: s.action,
      quantity: s.quantity,
      beforeStock: s.beforeStock,
      afterStock: s.afterStock,
      date: s.createdAt,
      description: s.description,
    }));

    setLogs(mappedLogs);
    console.log(mappedLogs);
  } catch (err) {
    console.error("Stok hareketleri çekilemedi", err);
  }
};


    fetchLogs();
  }, []);

  const filteredLogs = logs.filter((p) => {
    const name = String(p.productName || "");
    const code = String(p.productId || "");
    return (
      name.toLowerCase().includes(search.toLowerCase()) ||
      code.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="flex-1 p-6 bg-gray-100 text-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Stok Hareketleri</h2>
  
        <div className="relative">
          <FaSearch className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Ürün adı veya ID ara..."
            className="w-64 pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Yükleniyor...</div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border-l-4 border-gray-500">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ürün ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ürün Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kullanıcı
                </th>
              
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Miktar
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Önceki Stok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sonraki Stok
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Açıklama
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{log.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-mono">
                    {log.productId}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{log.user}</td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.quantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.beforeStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.afterStock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {log.description}
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-4 text-center text-gray-400"
                  >
                    Aramaya uygun kayıt bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
