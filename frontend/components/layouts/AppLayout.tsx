"use client";

import React, { useState } from "react";
import { 
  Users, Calendar, ClipboardCheck, BookOpen, 
  CreditCard, LayoutDashboard, Settings, 
  ChevronLeft, ChevronRight, Bell, LogOut 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; // utils for class names

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "#" },
  { name: "Attendance", icon: ClipboardCheck, href: "#" },
  { name: "Students", icon: Users, href: "#" },
  { name: "Academic Diary", icon: BookOpen, href: "#" },
  { name: "Fees & Billing", icon: CreditCard, href: "#" },
  { name: "Events", icon: Calendar, href: "#" },
  { name: "Settings", icon: Settings, href: "#" },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        initial={{ width: isCollapsed ? 80 : 260 }}
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="glass-card h-full flex flex-col border-r relative z-30"
      >
        <div className="p-6 flex items-center justify-between">
          {!isCollapsed && (
            <span className="font-bold text-xl bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
              PPS Manager
            </span>
          )}
          <button 
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1 mt-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <item.icon size={22} className="shrink-0 group-hover:scale-110 transition-transform" />
              {!isCollapsed && <span className="font-medium">{item.name}</span>}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-border/50">
          <button className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-destructive hover:bg-destructive/10 transition-all">
            <LogOut size={22} />
            {!isCollapsed && <span className="font-medium">Sign Out</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        {/* Navbar */}
        <header className="glass-nav px-8 h-20 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Welcome Back, Admin</h1>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-background"></span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-bold ring-2 ring-primary/20">
              A
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
