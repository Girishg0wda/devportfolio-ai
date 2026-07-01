import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getContacts, markContactAsRead } from "../services/contactService";
import {
  Mail,
  Check,
  AlertCircle,
  ArrowLeft,
  RefreshCw,
  Eye,
  MessageSquareCode,
} from "lucide-react";

export default function Messages() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const data = await getContacts();
      setContacts(data);
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to pull client messages from secure SQLite storage.");
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (contactId) => {
    try {
      await markContactAsRead(contactId);
      setContacts((prev) =>
        prev.map((c) => (c.id === contactId ? { ...c, is_read: true } : c)),
      );
    } catch (error) {
      console.error(error);
      setErrorMsg("Error modifying read parameters for requested record.");
    }
  };

  const filteredContacts = contacts.filter((c) => {
    if (filter === "UNREAD") return !c.is_read;
    if (filter === "READ") return c.is_read;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FBF9F6] pt-36 pb-24 px-6 relative">
      <div className="grain-overlay" />

      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Header Controls */}
        <div className="border-b border-fine pb-12 mb-16 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6">
          <div>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-1.5 font-mono text-xs tracking-wider text-gray-500 hover:text-[#FF3311] mb-4 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> BACK TO DASHBOARD OVERVIEW
            </Link>
            <h1 className="text-4xl sm:text-5xl font-serif font-light tracking-tight mt-1">
              Message Center
            </h1>
          </div>
          <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            [ ENCRYPTED INBOX ]
          </span>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex bg-[#F1EFEA] border border-fine p-1 rounded font-mono text-xs">
            <button
              onClick={() => setFilter("ALL")}
              className={`px-4 py-2 rounded font-bold transition-all ${
                filter === "ALL"
                  ? "bg-black text-[#FBF9F6]"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              ALL RECORDS ({contacts.length})
            </button>
            <button
              onClick={() => setFilter("UNREAD")}
              className={`px-4 py-2 rounded font-bold transition-all ${
                filter === "UNREAD"
                  ? "bg-black text-[#FBF9F6]"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              UNREAD ({contacts.filter((c) => !c.is_read).length})
            </button>
            <button
              onClick={() => setFilter("READ")}
              className={`px-4 py-2 rounded font-bold transition-all ${
                filter === "READ"
                  ? "bg-black text-[#FBF9F6]"
                  : "text-gray-600 hover:text-black"
              }`}
            >
              READ ({contacts.filter((c) => c.is_read).length})
            </button>
          </div>

          <button
            onClick={loadContacts}
            className="flex items-center gap-1.5 px-4 py-2 bg-white border border-fine rounded hover:border-black font-mono text-xs text-gray-700 transition-colors shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" /> REFRESH LIST
          </button>
        </div>

        {errorMsg && (
          <div className="p-4 mb-8 bg-rose-50 border border-rose-300 rounded text-rose-800 text-xs font-medium flex items-center gap-2">
            <AlertCircle className="w-4.5 h-4.5 text-rose-600" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Messaging Logs Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 text-gray-400 font-mono text-xs gap-3">
            <RefreshCw className="w-6 h-6 animate-spin text-[#FF3311]" />
            <span>DOWNLOADING SECURE INBOX STACKS...</span>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="text-center font-mono py-24 text-gray-400 border border-dashed border-fine rounded p-12 bg-[#F1EFEA]/20">
            [ INBOX DIRECTORY IS VACANT ]
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            {filteredContacts.map((contact) => (
              <div
                key={contact.id}
                className={`p-6 sm:p-8 bg-white border-2 rounded transition-all duration-300 flex flex-col gap-6 relative ${
                  contact.is_read
                    ? "border-fine/60 opacity-80"
                    : "border-black shadow-brutal hover:shadow-brutal-orange"
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-fine/50">
                  <div>
                    <span className="font-mono text-[9px] text-[#FF3311] font-bold tracking-widest uppercase block mb-1">
                      [ CLIENT SENDER ]
                    </span>
                    <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight">
                      {contact.name}
                    </h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-mono text-xs text-gray-500 hover:text-black underline transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] bg-[#F1EFEA] border border-fine px-2 py-1 rounded text-gray-600 uppercase">
                      SUBJECT: {contact.subject || "[ NO SUBJECT ]"}
                    </span>
                    {!contact.is_read && (
                      <span className="w-2 h-2 bg-[#FF3311] rounded-full animate-pulse" />
                    )}
                  </div>
                </div>

                {/* Body Message */}
                <div>
                  <span className="font-mono text-[9px] text-gray-400 tracking-wider uppercase block mb-2 font-bold">
                    [ TRANSMITTED PARAMETERS / BODY ]
                  </span>
                  <p className="font-sans text-sm sm:text-base text-gray-800 leading-relaxed max-w-4xl bg-[#F1EFEA]/10 border border-fine/30 p-4 sm:p-6 rounded whitespace-pre-wrap">
                    {contact.message}
                  </p>
                </div>

                {/* Footer Controls */}
                <div className="flex justify-between items-center pt-2">
                  <span className="font-mono text-[10px] text-gray-400">
                    LOG ID: #{contact.id}
                  </span>

                  {!contact.is_read && (
                    <button
                      onClick={() => handleMarkAsRead(contact.id)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-black hover:bg-[#FF3311] text-white font-mono text-xs font-bold tracking-widest uppercase rounded shadow-brutal hover:shadow-brutal-orange transition-all duration-200"
                    >
                      <Check className="w-3.5 h-3.5" /> MARK AS READ
                    </button>
                  )}
                  {contact.is_read && (
                    <span className="font-mono text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                      ✓ ENVELOPE PROCESSED
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
