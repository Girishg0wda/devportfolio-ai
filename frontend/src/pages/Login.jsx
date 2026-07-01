import React, { useState } from "react";
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Lock, Mail, ArrowRight, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    setSubmitting(true);
    setErrorMsg("");

    try {
      const data = await loginUser(email, password);
      if (data.access_token) {
        login(data.access_token);
        navigate("/dashboard");
      } else {
        setErrorMsg(data.message || "Invalid email or password.");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setErrorMsg("Connection failure. Ensure the API server is active.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] flex items-center justify-center px-6 relative">
      {/* Global Grain Overlay */}
      <div className="grain-overlay" />

      <div className="w-full max-w-md bg-[#F1EFEA]/40 border-2 border-black p-8 sm:p-12 rounded shadow-brutal relative z-10">
        <span className="font-mono text-[9px] text-[#FF3311] tracking-widest uppercase block mb-4 font-bold">
          [ STAFF SECURE PORTAL ]
        </span>
        
        <h1 className="text-4xl font-serif font-light tracking-tight text-gray-900 mb-2">
          Administrator Login
        </h1>
        <p className="font-sans text-xs text-gray-500 mb-8 leading-relaxed">
          Authenticate with credentials to access projects creation, update indices, and parse contact submissions logs.
        </p>

        {errorMsg && (
          <div className="p-4 mb-6 bg-rose-50 border border-rose-300 rounded text-rose-800 flex items-start gap-2.5 text-xs font-medium">
            <AlertCircle className="w-4.5 h-4.5 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-bold">
              ADMIN EMAIL *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@test.com"
                className="w-full pl-11 pr-4 py-3 bg-white border border-fine rounded focus:border-black outline-none font-sans text-sm transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[10px] text-gray-400 uppercase tracking-wider font-bold">
              PASSWORD *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 bg-white border border-fine rounded focus:border-black outline-none font-sans text-sm transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-black hover:bg-[#FF3311] text-white font-mono text-xs font-bold tracking-widest uppercase rounded shadow-brutal hover:shadow-brutal-orange transition-all duration-300 flex items-center justify-center gap-2"
          >
            {submitting ? "VERIFYING ENCRYPTION..." : "VERIFY PORTAL ACCESS"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-fine/50 text-center">
          <button
            type="button"
            onClick={() => {
              setEmail("admin@test.com");
              setPassword("admin123");
            }}
            className="font-mono text-[10px] text-gray-400 hover:text-black transition-colors"
          >
            [ AUTOPUSH SEED DEMO CREDENTIALS ]
          </button>
        </div>
      </div>
    </div>
  );
}
