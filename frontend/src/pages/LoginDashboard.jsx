import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import mandirImg from "../assets/mandir.jpg";

export default function Login() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "cleaner";
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logging in:", { ...form, role });

    // ✅ Backend API call here
    // api.post("/auth/login", { ...form, role }).then(() => {
    if (role === "volunteer") {
      navigate("/volunteer");
    } else {
      navigate("/cleaner");
    }
    // });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6 relative"
      style={{
        backgroundImage: `url(${mandirImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="relative z-10 bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700"
          >
            Login
          </button>
        </form>

        <p className="mt-4 text-center">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate(`/auth/register?role=${role}`)}
            className="text-purple-600 cursor-pointer"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
