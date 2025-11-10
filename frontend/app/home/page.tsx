"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaTimes, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Api from "../api";

interface Product {
  productCode: string;
  name: string;
  brand: string;
  minStock: number;
  currentStock: number;
  img: string;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const token =  localStorage.getItem("token");
        const res = await axios.get<Product[]>(Api.ENDPOINTS.GET_ALL_PRODUCT, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(res.data);
      } catch (err) {
        console.error("Ürünler çekilemedi:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

const filteredProducts = products.filter((p) => {
  const name = String(p.name || "");
  const code = String(p.productCode || "");
  return name.toLowerCase().includes(search.toLowerCase()) || code.toLowerCase().includes(search.toLowerCase());
});


  return (
    <div className="flex-1 p-6 text-gray-900">
    
      <div className="flex-1">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-gradient-to-b border-gray-500">
          <h2 className="text-2xl font-bold mb-2 text-blue-700">Ürün Listesi</h2>
          <p className="mb-4 text-gray-600 text-sm">Ürünlere tıklayarak detaylara ulaşabilirsiniz</p>

          <div className="mb-4 relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Ürün adı veya ID ara..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-400 bg-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center mt-6">Ürünler yükleniyor...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-xl shadow-lg border-l-4 border-gradient-to-b border-gray-500">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {["Resim","Ürün Kodu","İsim","Marka","Min Stok","Mevcut Stok","Detay"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr 
                    key={product.productCode} 
                    className="cursor-pointer hover:bg-purple-50 transition"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <img
                        src="/images/product.png"
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{product.productCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{product.brand}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{product.minStock}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm font-semibold ${
                      product.currentStock < product.minStock ? "text-red-600" : "text-green-600"
                    }`}>{product.currentStock}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-purple-600"><FaChevronRight/></td>
                  </tr>
                ))}
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-4 text-center text-gray-400">
                      Aramaya uygun ürün bulunamadı.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

 
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl rounded-l-2xl p-6 z-50 flex flex-col border-l-4 border-pink-500"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedProduct(null)}
            >
              <FaTimes size={20} />
            </button>

            <div className="flex justify-center mb-6">
                <img src="/images/folder.png" className="w-28 mx-auto mt-4" />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <img src={selectedProduct.img} width={70} className="rounded-lg shadow-lg" />
              <div className="flex flex-col">
                <h4 className="text-xl font-bold text-blue-700">{selectedProduct.name}</h4>
                <p className="text-purple-600 font-medium">{selectedProduct.brand}</p>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg shadow mb-4">
              <p className="text-sm font-semibold text-blue-600 mb-2">Stok Bilgisi</p>
              <p><strong>Min Stok:</strong> {selectedProduct.minStock}</p>
              <p className={`font-semibold ${selectedProduct.currentStock < selectedProduct.minStock ? "text-red-600" : "text-green-600"}`}>
                <strong>Mevcut Stok:</strong> {selectedProduct.currentStock}
              </p>
            </div>

            
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
