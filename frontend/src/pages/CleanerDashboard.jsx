import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mandirImg from "../assets/mandir.jpg"; 

export default function Volunteer() {
  const [reports, setReports] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [clusterId, setClusterId] = useState(null); // cluster from QR

  useEffect(() => {
    // Mock reports with cluster IDs
    const mockReports = [
      { _id: "1", toiletId: "1,2,3", reportType: "Broken Tap", status: "pending", verified: false, clusterId: "A" },
      { _id: "2", toiletId: "T-102", reportType: "Clogged Drain", status: "verification_pending", verified: true, clusterId: "B" },
      { _id: "3", toiletId: "T-205", reportType: "No Water", status: "pending", verified: false, clusterId: "A" },
    ];
    const mockCleaners = [
      { _id: "c1", name: "Ravi", clusterId: "A" },
      { _id: "c2", name: "Sita", clusterId: "B" },
    ];

    setTimeout(() => {
      setReports(mockReports);
      setCleaners(mockCleaners);
      setLoading(false);
    }, 800);
  }, []);

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
    setClusterId(null);
  };

  // Filter by cluster
  const filteredReports = clusterId ? reports.filter(r => r.clusterId === clusterId) : [];
  const filteredCleaners = clusterId ? cleaners.filter(c => c.clusterId === clusterId) : [];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center relative p-4 sm:p-6 pt-16 font-sans"
      style={{
        backgroundImage: `url(${mandirImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/45"></div>

      {/* Logout Button */}
      {clusterId && (
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="absolute top-4 right-4 px-4 py-2 rounded-full 
                   bg-gradient-to-r from-red-500 via-pink-500 to-red-600 
                   text-white font-semibold shadow-md"
        >
          🚪 Logout
        </motion.button>
      )}

      <div className="relative z-10 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-black text-center mb-8">
          Volunteer Dashboard
        </h2>

        {message && (
          <div className="fixed top-5 right-5 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg z-50">
            {message}
          </div>
        )}

        {/* Simulated QR Scan */}
        {!clusterId ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg text-gray-800 font-medium">📷 Scan Cluster QR</p>
            <select
              onChange={(e) => setClusterId(e.target.value)}
              defaultValue=""
              className="px-4 py-2 rounded-lg border border-gray-300 text-base focus:ring-2 focus:ring-indigo-500 bg-white"
            >
              <option value="" disabled>Select Cluster</option>
              <option value="A">Cluster A</option>
              <option value="B">Cluster B</option>
            </select>
          </div>
        ) : loading ? (
          <p className="text-center text-gray-700">Loading data...</p>
        ) : filteredReports.length === 0 ? (
          <p className="text-center text-gray-700">No reports for this cluster.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredReports.map((report, i) => (
              <motion.div
                key={report._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/90 rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition"
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
                    {report.status.replace("_", " ")}
                  </span>
                </p>
                <div className="flex flex-wrap gap-3">
                  {!report.verified && (
                    <button
                      onClick={() => verifyReport(report._id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium shadow"
                    >
                      Verify Report
                    </button>
                  )}
                  {report.verified && report.status === "pending" && (
                    <select
                      onChange={(e) => assignCleaner(report._id, e.target.options[e.target.selectedIndex].text)}
                      defaultValue=""
                      className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm bg-white"
                    >
                      <option value="" disabled>Select Cleaner</option>
                      {filteredCleaners.map((c) => (
                        <option key={c._id} value={c._id}>{c.name}</option>
                      ))}
                    </select>
                  )}
                  {report.status === "verification_pending" && (
                    <button
                      onClick={() => verifyCleanerWork(report._id)}
                      className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium shadow"
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
