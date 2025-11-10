"use client"; 

import Menu from "../component/menu";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Menu />
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
