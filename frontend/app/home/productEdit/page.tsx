"use client";

import React, { useEffect, useState, useRef } from "react";
import { FaEllipsisH, FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { createPortal } from "react-dom";
import Api from "@/app/api";

interface Product {
  id: number;
  productCode: number;
  name: string;
  brand: string;
  minStock: number;
  currentStock: number;
}

export default function ProductEditPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{
    top: number;
    left: number;
  }>({ top: 0, left: 0 });
  const [selectedProduct, setSelectedProduct] = useState<boolean>(false);
  const [formData, setFormData] = useState<Partial<Product>>({});
  const buttonRefs = useRef<{ [key: number]: HTMLButtonElement | null }>({});

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get<Product[]>(Api.ENDPOINTS.GET_ALL_PRODUCT, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setProducts(res.data);
    } catch (err) {
      console.error("Ürünler çekilemedi:", err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchProducts();
  }, []);

  const addProduct = () => {
    setFormData({
      name: "",
      productCode: 0,
      brand: "",
      minStock: 0,
      currentStock: 0,
    });
    setSelectedProduct(true);
  };

  const saveProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      if (formData.id) {
        await axios.put(
          Api.ENDPOINTS.GET_ALL_PRODUCT + "/" + formData.id,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(Api.ENDPOINTS.GET_ALL_PRODUCT, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setSelectedProduct(false);
      fetchProducts();
    } catch (err: any) {
      console.error(err);
      alert(err.response?.data?.message || "Bir hata oluştu.");
    }
  };

  const deleteProduct = async (id: number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(Api.ENDPOINTS.GET_ALL_PRODUCT + `/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts();
      setOpenDropdownId(null);
    } catch (err) {
      console.error(err);
    }
  };

  const editProduct = (product: Product) => {
    setFormData(product);
    setSelectedProduct(true);
    setOpenDropdownId(null);
  };

  const toggleDropdown = (id: number) => {
    const button = buttonRefs.current[id];
    if (!button) return;

    const rect = button.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX,
    });
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  return (
    <div className="flex-1 p-6 bg-gray-100 text-black">
      <div className="flex justify-between items-center bg-white rounded-xl shadow-sm p-6 mb-6 border-l-4 border-gray-500">
        <h2 className="text-xl font-bold text-blue-700">
          Ürün Düzenleme Sayfası
        </h2>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={addProduct}
        >
          <FaPlus /> Ürün Ekle
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-sm border-l-4 border-gray-500">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "Ürün",
                "Ürün Kodu",
                "Ürün Adı",
                "Marka",
                "Min Stok",
                "Stok",
                "İşlemler",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr
                key={product.id}
                className="relative hover:bg-purple-50 transition"
              >
                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                  <img
                    src="/images/product.png"
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {product.productCode}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {product.brand}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                  {product.minStock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                  {product.currentStock}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    ref={(el) => {
                      buttonRefs.current[product.id] = el;
                    }}
                    className="p-2 rounded hover:bg-gray-100 transition"
                    onClick={() => toggleDropdown(product.id)}
                  >
                    <FaEllipsisH style={{ color: "black" }} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openDropdownId &&
        createPortal(
          <div
            className="absolute w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
            style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
          >
            <div className="py-1 flex flex-col">
              <button
                onClick={() => {
                  const product = products.find((p) => p.id === openDropdownId);
                  if (product) editProduct(product);
                }}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition rounded-lg"
              >
                <FaEdit /> Düzenle
              </button>
              <button
                onClick={() => deleteProduct(openDropdownId)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 transition rounded-lg"
              >
                <FaTrash /> Sil
              </button>
            </div>
          </div>,
          document.body
        )}

      {/* Ürün Form Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl rounded-l-3xl p-6 z-40 flex flex-col border-l-4 border-gray-500"
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => setSelectedProduct(false)}
            >
              <FaTimes size={24} />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <FaPlus className="text-gray-500 text-2xl" />
              <h3 className="text-2xl font-bold text-gray-800">
                {formData.id ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </h3>
            </div>

            <div className="flex flex-col gap-4 flex-1 overflow-y-auto">
              {["productCode", "name", "brand", "minStock", "currentStock"].map(
                (field) => (
                  <input
                    key={field}
                    type={
                      field.includes("Stock") || field === "productCode"
                        ? "number"
                        : "text"
                    }
                    placeholder={
                      field === "productCode"
                        ? "Ürün Kodu"
                        : field === "name"
                        ? "Ürün Adı"
                        : field === "brand"
                        ? "Marka"
                        : field === "minStock"
                        ? "Min Stok"
                        : "Mevcut Stok"
                    }
                    className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-gray-400 focus:border-gray-400 transition placeholder-gray-400"
                    value={formData[field as keyof Product] || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field]:
                          field.includes("Stock") || field === "productCode"
                            ? Number(e.target.value)
                            : e.target.value,
                      })
                    }
                  />
                )
              )}
            </div>

            <button
              className="mt-6 bg-gray-500 text-white py-3 rounded-2xl font-semibold hover:bg-gray-600 transition shadow-lg flex items-center justify-center gap-2"
              onClick={saveProduct}
            >
              <FaPlus /> Kaydet
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
