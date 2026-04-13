import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar, { readSidebarCollapsed } from "./Sidebar.jsx";

export default function Layout({ userEmail }) {
  const location = useLocation();
  const isAnalyze = location.pathname.includes("/analyze");
  const [collapsed, setCollapsed] = useState(readSidebarCollapsed);

  const mainPad = collapsed ? "pl-[76px]" : "pl-[268px]";

  return (
    <div className="min-h-screen transition-colors duration-300">
      <Sidebar
        userEmail={userEmail}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
      />
      <main className={`min-h-screen transition-[padding] duration-300 ease-out ${mainPad}`}>
        <div
          className={
            isAnalyze
              ? "h-screen overflow-hidden px-4 py-6 sm:px-6 lg:px-8 lg:py-8"
              : "mx-auto max-w-5xl px-6 py-8 sm:px-8 lg:py-10"
          }
        >
          <Outlet />
        </div>
      </main>
    </div>
  );
}
