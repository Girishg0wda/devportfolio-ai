import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 pt-4">

        <nav
          className="
          flex
          items-center
          justify-between
          px-8
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
            text-3xl
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

          {/* Links */}

          <div className="flex items-center gap-8">

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

            {!isAuthenticated ? (
              <Link
                to="/login"
                className="
                px-5
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
                px-5
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

        </nav>

      </div>
    </header>
  );
}

export default Navbar;