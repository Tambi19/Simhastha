import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import mandirImg from "../assets/mandir.jpg";

export default function Register() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role") || "cleaner";
  const clusterId = searchParams.get("clusterId") || "unknown";

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mock saving user
    console.log("Registering:", { ...form, role, clusterId });

    // Save to localStorage for fake auth
    localStorage.setItem(
      "user",
      JSON.stringify({ ...form, role, clusterId })
    );

    if (role === "volunteer") {
      navigate(`/volunteer?clusterId=${clusterId}`);
    } else {
      navigate(`/cleaner?clusterId=${clusterId}`);
    }
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
          Register as {role.charAt(0).toUpperCase() + role.slice(1)}
        </h2>
        <p className="text-center mb-4 text-sm text-gray-600">
          Cluster ID: <strong>{clusterId}</strong>
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
            required
          />
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
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Register
          </button>
        </form>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <span
            onClick={() =>
              navigate(`/auth/login?role=${role}&clusterId=${clusterId}`)
            }
            className="text-blue-600 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
