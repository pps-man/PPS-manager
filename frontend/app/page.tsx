"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, GraduationCap, Users, BookOpen, Clock, Heart, Award, CreditCard } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
              <GraduationCap size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight font-outfit">PPS Manager</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-slate-500 font-medium">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</Link>
            <Link href="#about" className="hover:text-indigo-600 transition-colors">About Us</Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/login" className="px-4 py-2 font-medium text-slate-600 hover:text-indigo-600 transition-colors">Login</Link>
            <Link href="/register" className="bg-indigo-600 text-white px-6 py-2.5 rounded-full font-bold shadow-xl shadow-indigo-100/50 hover:bg-indigo-700 transition-all active:scale-95">
              Start Free Trial
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-40 pb-20 px-6 relative overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-indigo-50/50 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 -z-10 w-[600px] h-[600px] bg-blue-50/50 blur-3xl rounded-full" />

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block px-4 py-1.5 mb-8 text-sm font-bold bg-indigo-50 text-indigo-600 rounded-full border border-indigo-100">
              The #1 Choice for Modern Preschools
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-[1.1] text-slate-900 font-outfit">
              Elevate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Play School</span> <br /> 
              to world-class standards.
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-slate-500 mb-12 font-medium leading-relaxed">
              Simplify administration, delight parents, and focus on what matters most: 
              providing the best early education for every child.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link href="/dashboard" className="w-full sm:w-auto bg-indigo-600 text-white px-10 py-5 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg shadow-2xl shadow-indigo-200 hover:-translate-y-1 hover:shadow-indigo-300 transition-all active:scale-95">
                Launch My Dashboard <ArrowRight size={22} />
              </Link>
              <Link href="#demo" className="w-full sm:w-auto px-10 py-5 rounded-2xl border-2 border-slate-100 flex items-center justify-center gap-3 font-bold text-lg hover:bg-slate-50 transition-all text-slate-600">
                Book a Demo
              </Link>
            </div>

            {/* Trusted By Section (Quick Stats) */}
            <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-slate-100 pt-16">
              {[
                { label: "Active Schools", val: "500+", icon: GraduationCap },
                { label: "Reports Generated", val: "10M+", icon: BookOpen },
                { label: "Verified Parents", val: "50K+", icon: Users },
                { label: "Reliability", val: "99.9%", icon: ShieldCheck }
              ].map((stat, i) => (
                <div key={i} className="text-center group">
                  <div className="flex justify-center mb-3">
                    <stat.icon className="text-indigo-600 w-6 h-6 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 font-outfit">{stat.val}</h4>
                  <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      {/* Feature Highlighting Section */}
      <section className="py-24 bg-slate-50/50" id="features">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight font-outfit leading-tight mb-4">
              Everything you need <br className="md:hidden" /> to run your school.
            </h2>
            <p className="text-slate-500 font-medium max-w-xl mx-auto">
              Our comprehensive suite of tools replaces your paperwork with a single, elegant digital platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Smart Attendance", 
                desc: "One-click marking with automated SMS alerts for absentees.", 
                icon: Clock, 
                color: "bg-blue-500" 
              },
              { 
                title: "Auto Fee Recovery", 
                desc: "Send automated payment reminders and process UPI payments instantly.", 
                icon: CreditCard, 
                color: "bg-emerald-500" 
              },
              { 
                title: "Digital Diary", 
                desc: "Keep parents updated with daily photos and learning activity feeds.", 
                icon: Heart, 
                color: "bg-rose-500" 
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-10 group bg-white shadow-soft">
                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon size={30} strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-extrabold mb-4 text-slate-900 font-outfit">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// Add a custom style for "soft" shadow in globals.css if not already there
