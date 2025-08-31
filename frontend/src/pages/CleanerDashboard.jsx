import { useState, useRef } from "react";
import logo from "../assets/logo.png"; 
import mandirImg from "../assets/mandir.jpg"; 

export default function CleanerDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, description: "Clean Toilet Block A", status: "Pending", proof: null },
    { id: 2, description: "Clean Toilet Block B", status: "Pending", proof: null },
    { id: 3, description: "Check Water Supply", status: "Pending", proof: null },
  ]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

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

    // stop camera
    const stream = videoRef.current.srcObject;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
    setSelectedTask(null);
  };

  // Mark done
  const markDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
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
      {/* White overlay */}
      <div className="absolute inset-0 bg-white/60"></div>

      {/* Logo */}
      <img
        src={logo}
        alt="App Logo"
        className="absolute top-4 left-4 w-16 sm:w-20 z-20"
      />

      {/* Dashboard Card */}
      <div className="relative z-10 w-full max-w-2xl bg-white/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          🧹 Cleaner Dashboard
        </h1>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 text-center text-green-600 font-semibold">
            {successMessage}
          </div>
        )}

        {/* Tasks */}
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
                  onClick={() => markDone(task.id)}
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
      </div>

      {/* Camera Modal */}
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
