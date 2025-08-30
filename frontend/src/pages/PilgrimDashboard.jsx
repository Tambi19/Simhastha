import { useState } from "react";
import mandirImg from "../assets/mandir.jpg"; // <-- place the mandir image inside src/assets

export default function Pilgrim() {
  const [toiletId, setToiletId] = useState("");
  const [message, setMessage] = useState("");

  const reportIssue = async (issue) => {
    if (!toiletId) {
      setMessage("⚠️ Please enter a toilet number first.");
      return;
    }

    try {
      // replace with your API call
      // await api.post("/reports", { toiletId, reportType: issue });
      setMessage(`✅ Reported "${issue}" for Toilet ${toiletId}`);
      setToiletId("");
    } catch (err) {
      setMessage("❌ Failed to submit report. Try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative p-6"
      style={{
        backgroundImage: `url(${mandirImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Transparent white overlay for readability */}
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="relative z-10 bg-white/50 shadow-2xl rounded-2xl p-8 w-full max-w-md backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          🚻 Pilgrim/तीर्थयात्री
        </h2>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter Toilet Number"
          value={toiletId}
          onChange={(e) => setToiletId(e.target.value)}
          className="border-2 border-black-200 rounded-lg px-4 py-3 w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        />

        {/* Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => reportIssue("Need Water")}
            className="bg-blue-500 bg-opacity-80 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-600 hover:shadow-lg transition transform hover:scale-[1.02]"
          >
            🚰 Need Water
          </button>
          <button
            onClick={() => reportIssue("Need Cleaning")}
            className="bg-green-500 bg-opacity-80 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-green-600 hover:shadow-lg transition transform hover:scale-[1.02]"
          >
            🧹 Need Cleaning
          </button>
          <button
            onClick={() => reportIssue("Dirty")}
            className="bg-red-500 bg-opacity-80 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-600 hover:shadow-lg transition transform hover:scale-[1.02] sm:col-span-2"
          >
            🚫 Dirty
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <p className="mt-6 text-center font-medium text-gray-700">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
