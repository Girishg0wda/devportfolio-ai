import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 pt-4">

        <nav
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          "
        >
          <div className="flex items-center justify-between px-6 py-4">

            {/* Logo */}
            <Link
              to="/"
              className="
                text-xl
                font-bold
                bg-gradient-to-r
                from-blue-400
                to-purple-500
                bg-clip-text
                text-transparent
              "
            >
              Girish
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">

              <Link to="/" className="hover:text-blue-400 transition">
                Home
              </Link>

              <Link to="/projects" className="hover:text-blue-400 transition">
                Projects
              </Link>

              <Link to="/contact" className="hover:text-blue-400 transition">
                Contact
              </Link>

              {isAuthenticated && (
                <Link
                  to="/dashboard"
                  className="hover:text-blue-400 transition"
                >
                  Dashboard
                </Link>
              )}

              {!isAuthenticated ? (
                <Link
                  to="/login"
                  className="
                    px-4 py-2
                    rounded-lg
                    bg-blue-600
                    hover:bg-blue-700
                    transition
                  "
                >
                  Login
                </Link>
              ) : (
                <button
                  onClick={logout}
                  className="
                    px-4 py-2
                    rounded-lg
                    bg-red-500/20
                    text-red-400
                    hover:bg-red-500/30
                    transition
                  "
                >
                  Logout
                </button>
              )}

            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-2xl"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>

          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden border-t border-white/10 px-6 py-4">

              <div className="flex flex-col gap-4">

                <Link
                  to="/"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>

                <Link
                  to="/projects"
                  onClick={() => setIsOpen(false)}
                >
                  Projects
                </Link>

                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>

                {isAuthenticated && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                )}

                {!isAuthenticated ? (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="
                      bg-blue-600
                      px-4 py-2
                      rounded-lg
                      text-center
                    "
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={logout}
                    className="
                      bg-red-500/20
                      text-red-400
                      px-4 py-2
                      rounded-lg
                    "
                  >
                    Logout
                  </button>
                )}

              </div>

            </div>
          )}

        </nav>

      </div>
    </header>
  );
}

export default Navbar;