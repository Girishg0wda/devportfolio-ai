import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(email, password);

    if (!data.access_token) {
      alert(data.message || "Login failed");
      return;
    }

    login(data.access_token);

    navigate("/dashboard");

  } catch (error) {
    console.log(error);

    alert("Login Failed");
  }
};

  return (
    <div className=" pt-36 min-h-screen bg-black text-white flex justify-center items-center">

      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-xl w-96"
      >
        <h1 className="text-3xl mb-6">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 bg-gray-800 rounded"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-3 bg-gray-800 rounded"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-blue-600 p-3 rounded"
        >
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;