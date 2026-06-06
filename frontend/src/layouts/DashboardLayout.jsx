import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function DashboardLayout({ children }) {
  const { logout } = useAuth();

  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* Desktop Sidebar */}
      <aside
        className="
          hidden
          md:block
          w-72
          border-r
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          p-8
        "
      >
        <h1
          className="
            text-3xl
            font-bold
            mb-10
            bg-gradient-to-r
            from-blue-400
            to-purple-500
            bg-clip-text
            text-transparent
          "
        >
          Admin Panel
        </h1>

        <nav className="space-y-3">

          <Link
            to="/dashboard"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-white/5
              transition
            "
          >
            Dashboard
          </Link>

          <Link
            to="/dashboard/projects"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-white/5
              transition
            "
          >
            Manage Projects
          </Link>

          <Link
            to="/dashboard/messages"
            className="
              block
              px-4
              py-3
              rounded-xl
              hover:bg-white/5
              transition
            "
          >
            Messages
          </Link>

        </nav>

        <button
          onClick={logout}
          className="
            mt-10
            w-full
            py-3
            rounded-xl
            bg-red-500/10
            text-red-400
            hover:bg-red-500/20
            transition
          "
        >
          Logout
        </button>

      </aside>

      {/* Content */}
      <main className="w-full p-4 md:p-8">
        {children}
      </main>

    </div>
  );
}

export default DashboardLayout;