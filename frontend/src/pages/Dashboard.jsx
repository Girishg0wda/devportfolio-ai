import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats } from "../services/dashboardService";
import {
  Folder,
  Mail,
  Users,
  ArrowUpRight,
  BarChart3,
  Settings,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-36 pb-24 px-6 relative">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />

      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Page Header */}
        <div className="border-b border-fine pb-12 mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#FF3311] font-bold">
              [ ADMINISTRATIVE CONTROL PANEL ]
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-tight mt-3">
              Dashboard Overview
            </h1>
          </div>
          <button
            onClick={logout}
            className="px-4 py-2 border border-fine hover:border-[#FF3311] text-xs font-mono font-bold hover:text-[#FF3311] rounded transition-colors flex items-center gap-1.5"
          >
            LOGOUT TERMINAL <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Projects Stats Card */}
          <div className="p-8 bg-white border-2 border-black rounded shadow-brutal flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                INDEXED PROJECTS
              </span>
              <div className="text-4xl font-serif font-bold text-gray-900 leading-none">
                {loading ? "..." : (stats?.projects ?? 0)}
              </div>
            </div>
            <div className="p-4 bg-[#F1EFEA] border border-fine rounded">
              <Folder className="w-6 h-6 text-[#FF3311]" />
            </div>
          </div>

          {/* Contacts Stats Card */}
          <div className="p-8 bg-white border-2 border-black rounded shadow-brutal flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                INBOX MESSAGES
              </span>
              <div className="text-4xl font-serif font-bold text-gray-900 leading-none">
                {loading ? "..." : (stats?.contacts ?? 0)}
              </div>
            </div>
            <div className="p-4 bg-[#F1EFEA] border border-fine rounded">
              <Mail className="w-6 h-6 text-[#FF3311]" />
            </div>
          </div>

          {/* Users Stats Card */}
          <div className="p-8 bg-white border-2 border-black rounded shadow-brutal flex items-center justify-between">
            <div>
              <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-2">
                STAFF MEMEBRS
              </span>
              <div className="text-4xl font-serif font-bold text-gray-900 leading-none">
                {loading ? "..." : (stats?.users ?? 1)}
              </div>
            </div>
            <div className="p-4 bg-[#F1EFEA] border border-fine rounded">
              <Users className="w-6 h-6 text-[#FF3311]" />
            </div>
          </div>
        </div>

        {/* Bento Board Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left panel: Projects */}
          <div className="p-8 bg-[#F1EFEA]/30 border border-fine rounded flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-[#FF3311] font-mono text-xs font-bold mb-4">
                <Folder className="w-4 h-4" /> [ PORTFOLIO DIRECTORIES ]
              </div>
              <h3 className="text-2xl font-serif font-light text-gray-900 mb-3">
                Manage Portfolio Content
              </h3>
              <p className="font-sans text-sm text-gray-600 mb-8 leading-relaxed">
                Add new work examples, delete expired prototypes, or configure
                live demo pointers and repository paths inside the active client
                index list.
              </p>
            </div>
            <Link
              to="/dashboard/projects"
              className="group w-full py-4 bg-black text-white rounded font-mono text-xs font-bold tracking-widest text-center shadow-brutal hover:bg-[#FF3311] transition-all flex items-center justify-center gap-2"
            >
              PROJECT MANAGEMENT WORKSPACE{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right panel: Contacts */}
          <div className="p-8 bg-[#F1EFEA]/30 border border-fine rounded flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 text-[#FF3311] font-mono text-xs font-bold mb-4">
                <Mail className="w-4 h-4" /> [ REKUEST LOGS ]
              </div>
              <h3 className="text-2xl font-serif font-light text-gray-900 mb-3">
                Read Incoming Messages
              </h3>
              <p className="font-sans text-sm text-gray-600 mb-8 leading-relaxed">
                Parse client inquiry records, extract demographic parameters,
                verify sender mail networks, and tag submitted briefs as read.
              </p>
            </div>
            <Link
              to="/dashboard/messages"
              className="group w-full py-4 bg-black text-white rounded font-mono text-xs font-bold tracking-widest text-center shadow-brutal hover:bg-[#FF3311] transition-all flex items-center justify-center gap-2"
            >
              MESSAGE INBOX TELEMETRY{" "}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
