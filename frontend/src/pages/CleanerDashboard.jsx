import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../assets/logo.png";
import mandirImg from "../assets/mandir.jpg";

export default function CleanerDashboard() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const clusterId = queryParams.get("clusterId");

  const demoTasks = {
    1: [
      { id: 101, description: "Clean Toilet Block A", status: "Pending", proof: null },
      { id: 102, description: "Sanitize Handrails", status: "Pending", proof: null },
      { id: 103, description: "Empty Trash Bins", status: "Pending", proof: null },
    ],
    2: [
      { id: 201, description: "Clean Main Hall", status: "Pending", proof: null },
      { id: 202, description: "Check Water Supply", status: "Pending", proof: null },
    ],
    3: [
      { id: 301, description: "Sanitize Entrance", status: "Pending", proof: null },
      { id: 302, description: "Clean Parking Area", status: "Pending", proof: null },
      { id: 303, description: "Refill Soap Dispensers", status: "Pending", proof: null },
    ],
  };

  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Load demo tasks for this cluster
  useEffect(() => {
    if (!clusterId) return;
    setTasks(demoTasks[clusterId] || []);
  }, [clusterId]);

  // Open camera
  const openCamera = (taskId) => {
    setSelectedTask(taskId);
    setSuccessMessage("");
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      })
      .catch((err) => console.error("Camera error:", err));
  };

  // Capture photo
  const capturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, 320, 240);
    const imageUrl = canvasRef.current.toDataURL("image/png");

    setTasks((prev) =>
      prev.map((task) =>
        task.id === selectedTask ? { ...task, proof: imageUrl } : task
      )
    );

    const stream = videoRef.current.srcObject;
    if (stream) stream.getTracks().forEach((track) => track.stop());

    setSelectedTask(null);
  };

  // Mark task done (removes from dashboard immediately)
  const markDone = (task) => {
    if (!task.proof) return;

    // Here you would send task.proof to backend if integrated
    console.log("Task completed:", task);

    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setSuccessMessage("✅ Task marked as completed!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center p-6"
      style={{
        backgroundImage: `url(${mandirImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-white/60"></div>

      <img
        src={logo}
        alt="App Logo"
        className="absolute top-4 left-4 w-16 sm:w-20 z-20"
      />

      <div className="relative z-10 w-full max-w-2xl bg-white/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🧹 Cleaner Dashboard - Cluster {clusterId || "N/A"}
        </h1>

        {successMessage && (
          <div className="mb-4 text-center text-green-600 font-semibold">
            {successMessage}
          </div>
        )}

        {tasks.length > 0 ? (
          <div className="grid gap-6">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-50 rounded-xl shadow p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-lg text-gray-800">{task.description}</p>
                  <p
                    className={`text-sm font-semibold ${
                      task.status === "Completed" ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {task.status}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-3 sm:mt-0">
                  <button
                    onClick={() => openCamera(task.id)}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  >
                    📸 Add Live Photo
                  </button>
                  <button
                    onClick={() => markDone(task)}
                    disabled={!task.proof}
                    className={`px-4 py-2 rounded-lg ${
                      task.proof
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-gray-400 text-gray-100 cursor-not-allowed"
                    }`}
                  >
                    ✅ Done
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-4">No tasks for this cluster.</p>
        )}
      </div>

      {selectedTask && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center z-20">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <video ref={videoRef} width="320" height="240" autoPlay className="rounded-lg" />
            <canvas ref={canvasRef} width="320" height="240" className="hidden" />
            <button
              onClick={capturePhoto}
              className="mt-4 px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              📷 Capture
            </button>
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-2 px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              ❌ Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
