import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import mandirImg from "../assets/mandir.jpg"; // <-- place the mandir image inside src/assets

export default function Volunteer() {
  const [reports, setReports] = useState([]);
  const [cleaners, setCleaners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


  useEffect(() => {
    // Mock data since backend doesn't exist yet
    const mockReports = [
      { _id: "1", toiletId: "1,2,3", reportType: "Broken Tap", status: "pending", verified: false },
      { _id: "2", toiletId: "T-102", reportType: "Clogged Drain", status: "verification_pending", verified: true },
            { _id: "1", toiletId: "1,2,3", reportType: "Broken Tap", status: "pending", verified: false },
      { _id: "1", toiletId: "1,2,3", reportType: "Broken Tap", status: "pending", verified: false },

    ];
    const mockCleaners = [
      { _id: "c1", name: "Ravi" },
      { _id: "c2", name: "Sita" },
      { _id: "c1", name: "Ravi" },
      { _id: "c1", name: "Ravi" },
    ];
    // Simulate API delay
    setTimeout(() => {
      setReports(mockReports);
      setCleaners(mockCleaners);
      setLoading(false);
    }, 1000);
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

  return (
    <div
      className=" min-h-screen w-full flex flex-col items-center relative p-6 pt-16 font-sans"
      style={{
        backgroundImage: `url(${mandirImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0  bg-white/45"></div>
      <div className="relative z-10 w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-black mb-8 text-center">
          Volunteer Dashboard
        </h2>
        {message && (
          <div className="fixed top-5 right-5 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg z-50">
            {message}
          </div>
        )}
        {loading ? (
          <p className="text-center text-gray-200">Loading data...</p>
        ) : reports.length === 0 ? (
          <p className="text-center text-gray-200">No reports found.</p>
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
                      className="px-3 py-1.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-indigo-500 bg-white"
                    >
                      <option value="" disabled>Select Cleaner</option>
                      {cleaners.map((c) => (
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

