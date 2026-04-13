import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import LogoMark from "./LogoMark.jsx";

const STORAGE_COLLAPSE = "sidebarCollapsed";

function IconDashboard({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M4 13h6V4H4v9zm10 7h6v-7h-6v7zM4 20h6v-5H4v5zm10-9h6V4h-6v7z" strokeLinejoin="round" />
    </svg>
  );
}

function IconSpark({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M12 3l1.8 5.5H19l-4.5 3.3 1.7 5.5L12 15.9 6.8 14.3l1.7-5.5L4 8.5h5.2L12 3z" strokeLinejoin="round" />
    </svg>
  );
}

function IconUsers({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSettings({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" strokeLinecap="round" />
    </svg>
  );
}

function IconChevron({ collapsed }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const items = [
  { to: "/", end: true, label: "Dashboard", Icon: IconDashboard },
  { to: "/analyze", label: "Analyze", Icon: IconSpark },
  { to: "/candidates", label: "Candidates", Icon: IconUsers },
  { to: "/settings", label: "Settings", Icon: IconSettings },
];

export default function Sidebar({ userEmail, collapsed, onToggleCollapse }) {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem(STORAGE_COLLAPSE, collapsed ? "1" : "0");
  }, [collapsed]);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    navigate("/login", { replace: true });
  }

  const w = collapsed ? "w-[76px]" : "w-[268px]";

  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-white/5 bg-sidebar text-white transition-[width] duration-300 ease-out ${w}`}
    >
      <div className={`flex items-center gap-3 border-b border-white/10 py-5 ${collapsed ? "justify-center px-2" : "px-5"}`}>
        <LogoMark
          variant="onDark"
          className="h-10 w-10 shrink-0 rounded-lg shadow-lg shadow-indigo-500/20"
        />
        {!collapsed ? (
          <div className="min-w-0 flex-1">
            <p className="truncate text-[15px] font-semibold tracking-tight text-white">
              AI Recruiter
            </p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-indigo-300/70">
              Hiring intelligence
            </p>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col bg-sidebar-elevated/80">
        <nav className={`flex flex-1 flex-col gap-1 py-4 ${collapsed ? "px-2" : "px-3"}`}>
          {items.map(({ to, end, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                [
                  "group relative flex items-center gap-3 rounded-xl py-2.5 text-sm font-medium transition-all duration-200",
                  collapsed ? "justify-center px-0" : "px-3",
                  isActive
                    ? "bg-white/[0.08] text-white shadow-nav-glow"
                    : "text-slate-400 hover:bg-sidebar-hover hover:text-slate-100 hover:shadow-[0_0_24px_rgba(99,102,241,0.08)]",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-indigo-500 transition-all duration-300 ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`}
                  />
                  <Icon
                    className={`relative z-10 h-[18px] w-[18px] shrink-0 transition-colors ${
                      isActive ? "text-indigo-300" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                  {!collapsed ? (
                    <span className="relative z-10 truncate">{label}</span>
                  ) : null}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className={`border-t border-white/10 p-3 ${collapsed ? "px-2" : ""}`}>
          <button
            type="button"
            onClick={onToggleCollapse}
            className={`mb-2 flex w-full items-center rounded-lg border border-white/10 bg-white/5 py-2 text-slate-400 transition hover:border-white/15 hover:bg-white/10 hover:text-slate-200 ${
              collapsed ? "justify-center px-0" : "justify-between px-3"
            }`}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {!collapsed ? <span className="text-xs font-medium">Collapse</span> : null}
            <IconChevron collapsed={collapsed} />
          </button>
        </div>
      </div>

      <div className={`border-t border-white/10 bg-sidebar px-3 py-4 ${collapsed ? "px-2" : ""}`}>
        {!collapsed ? (
          <p className="truncate text-xs text-slate-500" title={userEmail || ""}>
            {userEmail || "Signed in"}
          </p>
        ) : null}
        <button
          type="button"
          onClick={handleLogout}
          title="Logout"
          className={`mt-2 flex w-full items-center rounded-lg border border-white/10 bg-transparent py-2 text-sm font-medium text-slate-300 transition hover:-translate-y-0.5 hover:border-red-500/30 hover:bg-red-500/10 hover:text-red-200 hover:shadow-md ${
            collapsed ? "justify-center px-0" : "justify-start px-3"
          }`}
        >
          <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {!collapsed ? <span className="ml-2">Logout</span> : null}
        </button>
      </div>
    </aside>
  );
}

export function readSidebarCollapsed() {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_COLLAPSE) === "1";
}
