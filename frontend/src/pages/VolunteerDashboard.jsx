import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import mandirImg from "../assets/mandir.jpg";

export default function VolunteerDashboard() {
  const [searchParams] = useSearchParams();
  const [clusterId, setClusterId] = useState("unknown"); // default unknown

  const [reports, setReports] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Read clusterId from URL
  useEffect(() => {
    const id = searchParams.get("clusterId");
    if (id) setClusterId(id);
  }, [searchParams]);

  // Mock data load
  useEffect(() => {
    const mockReports = [
      { _id: "1", toiletId: "1,2,3", reportType: "Broken Tap", status: "pending", verified: false },
      { _id: "2", toiletId: "T-102", reportType: "Clogged Drain", status: "verification_pending", verified: true },
    ];
    const mockCleaners = [
      { _id: "c1", name: "Ravi" },
      { _id: "c2", name: "Sita" },
    ];
    setTimeout(() => {
      setReports(mockReports);
      setCleaners(mockCleaners);
      setLoading(false);
    }, 1000);
  }, [clusterId]); // reload data if cluster changes

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  const verifyReport = (id) => {
    setReports((prev) => prev.map((r) => (r._id === id ? { ...r, verified: true } : r)));
    showMessage(`✅ Report verified.`);
  };

  const assignCleaner = (reportId, cleanerName) => {
    if (!cleanerName) return;
    setReports((prev) => prev.map((r) => (r._id === reportId ? { ...r, status: "verification_pending" } : r)));
    showMessage(`🧹 ${cleanerName} assigned to report ${reportId}.`);
  };

  const verifyCleanerWork = (id) => {
    setReports((prev) => prev.map((r) => (r._id === id ? { ...r, status: "clean" } : r)));
    showMessage(`✨ Work approved for report ${id}.`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "clean": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "verification_pending": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const handleLogout = () => {
    showMessage("👋 Logged out successfully!");
    // Clear auth tokens / redirect to login here
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative p-4 sm:p-6 pt-16 font-sans"
      style={{
        backgroundImage: `url(${mandirImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Logout */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
        className="absolute top-4 right-4 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full 
                   bg-gradient-to-r from-red-500 via-pink-500 to-red-600 
                   text-white text-sm sm:text-base font-semibold shadow-md hover:shadow-lg 
                   hover:from-red-600 hover:to-pink-700 transition-all duration-300 z-20"
      >
        🚪 Logout
      </motion.button>

      <div className="relative z-10 w-full max-w-4xl">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold 
                       text-white text-center mb-4 drop-shadow-lg tracking-wide">
          Volunteer Dashboard
        </h2>

        {/* Cluster Selector */}
       

        {/* Toast */}
        <AnimatePresence>
          {message && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-5 right-5 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg z-50"
            >
              {message}
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <p className="text-center text-white">Loading data...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-white">No reports found for Cluster {clusterId}.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reports.map((report, i) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition backdrop-blur-sm"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Toilet: {report.toiletId}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <b>Issue:</b> {report.reportType}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  <b>Status:</b>{" "}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status.replace(/_/g, " ")}
                  </span>
                </p>

                <div className="flex flex-wrap gap-3">
                  {!report.verified && (
                    <button
                      onClick={() => verifyReport(report._id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow transition-all duration-200"
                    >
                      Verify Report
                    </button>
                  )}
                  {report.verified && report.status === "pending" && (
                    <select
                      onChange={(e) => assignCleaner(report._id, e.target.value)}
                      defaultValue=""
                      className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm 
                                 focus:ring-2 focus:ring-indigo-500 bg-white cursor-pointer transition"
                    >
                      <option value="" disabled>Select Cleaner</option>
                      {cleaners.map((c) => (
                        <option key={c._id} value={c.name}>{c.name}</option>
                      ))}
                    </select>
                  )}
                  {report.status === "verification_pending" && (
                    <button
                      onClick={() => verifyCleanerWork(report._id)}
                      className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 
                                 text-white text-sm font-medium shadow transition-all duration-200"
                    >
                      Approve Cleaning
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
