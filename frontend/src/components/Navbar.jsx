import { useState, useEffect } from "react";

import {
  Link,
  NavLink,
  useLocation,
} from "react-router-dom";

import {
  FaBars,
  FaTimes,
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } =
    useAuth();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">

      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-4">

        <nav
          className="
          flex
          items-center
          justify-between
          px-5
          py-4
          rounded-3xl
          border
          border-white/10
          bg-black/80
          backdrop-blur-2xl
          shadow-lg
          "
        >

          {/* Logo */}

          <Link
            to="/"
            className="
            text-xl
            md:text-3xl
            font-bold
            bg-gradient-to-r
            from-blue-400
            to-purple-500
            bg-clip-text
            text-transparent
            "
          >
            Girish.dev
          </Link>

          {/* Desktop Menu */}

          <div className="hidden md:flex items-center gap-8">

            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/projects"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Projects
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-400 font-semibold"
                  : "text-gray-300 hover:text-white transition"
              }
            >
              Contact
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-400 font-semibold"
                    : "text-gray-300 hover:text-white transition"
                }
              >
                Dashboard
              </NavLink>
            )}

            <a
              href="https://github.com/Girishg0wda"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/girisha-s-r"
              target="_blank"
              rel="noreferrer"
              className="text-gray-300 hover:text-white transition"
            >
              <FaLinkedin />
            </a>

            <a
              href="mailto:girishgowdasr428@gmail.com"
              className="text-gray-300 hover:text-white transition"
            >
              <FaEnvelope />
            </a>

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="
                px-4
                py-2
                rounded-xl
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
                px-4
                py-2
                rounded-xl
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

          {/* Mobile Menu Button */}

          <button
            onClick={() =>
              setMenuOpen(!menuOpen)
            }
            className="
            md:hidden
            text-white
            text-2xl
            "
          >
            {menuOpen ? (
              <FaTimes />
            ) : (
              <FaBars />
            )}
          </button>

        </nav>

        {/* Mobile Menu */}

        {menuOpen && (

          <div
            className="
            md:hidden
            mt-3
            rounded-3xl
            bg-slate-900
            border
            border-white/10
            backdrop-blur-xl
            p-5
            shadow-2xl
            space-y-4
            "
          >

            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-white text-lg"
            >
              Home
            </NavLink>

            <NavLink
              to="/projects"
              onClick={() => setMenuOpen(false)}
              className="block text-white text-lg"
            >
              Projects
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setMenuOpen(false)}
              className="block text-white text-lg"
            >
              Contact
            </NavLink>

            {isAuthenticated && (
              <NavLink
                to="/dashboard"
                onClick={() => setMenuOpen(false)}
                className="block text-white text-lg"
              >
                Dashboard
              </NavLink>
            )}

            {!isAuthenticated ? (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="
                inline-block
                mt-2
                px-4
                py-2
                rounded-xl
                bg-blue-600
                text-white
                "
              >
                Login
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="
                px-4
                py-2
                rounded-xl
                bg-red-500/20
                text-red-400
                "
              >
                Logout
              </button>
            )}

            <div className="border-t border-white/10 pt-4 flex gap-6">

              <a
                href="https://github.com/Girishg0wda"
                target="_blank"
                rel="noreferrer"
                className="text-white text-xl"
              >
                <FaGithub />
              </a>

              <a
                href="https://www.linkedin.com/in/girisha-s-r"
                target="_blank"
                rel="noreferrer"
                className="text-white text-xl"
              >
                <FaLinkedin />
              </a>

              <a
                href="mailto:girishgowdasr428@gmail.com"
                className="text-white text-xl"
              >
                <FaEnvelope />
              </a>

            </div>

          </div>

        )}

      </div>

    </header>
  );
}

export default Navbar;