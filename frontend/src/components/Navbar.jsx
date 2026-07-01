import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "PROJECTS", path: "/projects" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 left-0 w-full bg-[#FBF9F6]/90 backdrop-blur-md z-50 border-b border-fine">
        <div className="max-w-screen-2xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* LOGO */}
          <Link
            to="/"
            className="group flex items-center gap-1 font-mono text-sm tracking-wider font-bold"
          >
            <span className="text-[#FF3311]">●</span> GIRISH GOWDA
            <span className="hidden sm:inline-block text-gray-400 font-normal transition-transform duration-300 group-hover:translate-x-1">
              [ AIML & FULL STACK ]
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 transition-colors duration-300 hover:text-[#FF3311] ${
                  isActive(link.path)
                    ? "text-[#FF3311] font-bold"
                    : "text-gray-900"
                }`}
              >
                {link.name}

                {isActive(link.path) && (
                  <motion.span
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF3311]"
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                <Link
                  to="/dashboard"
                  className="px-3 py-1 bg-black text-[#FBF9F6] text-[10px] tracking-wider font-bold rounded shadow-brutal hover:bg-[#FF3311] hover:text-white transition-all duration-300"
                >
                  DASHBOARD
                </Link>

                <button
                  onClick={logout}
                  className="text-gray-500 hover:text-[#FF3311] text-[10px] uppercase font-bold"
                >
                  LOGOUT
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="group flex items-center gap-1 text-gray-500 hover:text-black transition-colors"
              >
                PORTAL
                <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-900 hover:text-[#FF3311] transition-colors"
            id="mobile-nav-toggle"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-0 w-full bg-[#FBF9F6] border-b border-fine z-40 md:hidden p-6 shadow-lg"
          >
            <div className="flex flex-col gap-6 font-mono text-sm tracking-wider">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`py-2 border-b border-gray-100 ${
                    isActive(link.path)
                      ? "text-[#FF3311] font-bold"
                      : "text-gray-900"
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="flex flex-col gap-4 pt-4 border-t border-gray-200">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="w-full text-center py-3 bg-black text-white rounded font-bold tracking-widest shadow-brutal"
                  >
                    GO TO DASHBOARD
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="w-full text-center py-3 border border-fine rounded font-bold text-gray-500 hover:text-[#FF3311]"
                  >
                    LOGOUT
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-3 bg-black text-[#FBF9F6] rounded font-bold tracking-widest shadow-brutal"
                >
                  STAFF LOGIN
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
