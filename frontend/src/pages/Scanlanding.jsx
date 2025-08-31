import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import mandirImg from "../assets/mandir.jpg"; // <-- put your mandir image in assets folder

export default function ScanLanding() {
  const buttonsRef = useRef([]);

  useEffect(() => {
    gsap.fromTo(
      buttonsRef.current,
      { scale: 0 },
      {
        scale: 1.1,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: 0.2,
        delay: 0.5,
        onComplete: () => {
          gsap.to(buttonsRef.current, {
            scale: 1,
            duration: 0.4,
            ease: "power2.out",
            delay: 1,
            stagger: 0.2,
          });
        },
      }
    );
  }, []);

  const buttonStyle =
    "w-full py-4 text-lg font-semibold rounded-2xl shadow-lg text-center relative overflow-hidden transition-all transform hover:-translate-y-1 hover:scale-105";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center relative p-6"
      style={{
        backgroundImage: `url(${mandirImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay with slight gradient for readability */}
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="relative z-10 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          “आपका एक कदम, लाखों के लिए स्वच्छता”
        </h1>

        <h1
          className="text-2xl sm:text-3xl md:text-4xl font-bold 
                   text-gray-800 mb-10 text-center flex items-center gap-2"
        >
          🚻 Welcome to <span className="text-blue-600">Sanitrack</span>
        </h1>

        <div className="grid grid-cols-1 gap-5 w-full max-w-sm">
          <Link
            ref={(el) => (buttonsRef.current[0] = el)}
            to="/pilgrim"
            className={`${buttonStyle} bg-gradient-to-r from-green-400 to-green-600 text-white shadow-green-200`}
            style={{ transform: "scale(0)" }}
          >
            🙋 I am a Pilgrim
          </Link>

          <Link
            ref={(el) => (buttonsRef.current[1] = el)}
            to="/cleaner"
            className={`${buttonStyle} bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-blue-300`}
            style={{ transform: "scale(0)" }}
          >
            🧹 I am a Cleaner
          </Link>

          <Link
            ref={(el) => (buttonsRef.current[2] = el)}
            to="/volunteer"
            className={`${buttonStyle} bg-gradient-to-r from-purple-400 to-purple-600 text-black shadow-purple-300`}
            style={{ transform: "scale(0)" }}
          >
            🤝 I am a Volunteer
          </Link>

          <Link
            ref={(el) => (buttonsRef.current[3] = el)}
            to="/nearby"
            className={`${buttonStyle} bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-yellow-200`}
            style={{ transform: "scale(0)" }}
          >
           🗺️ Nearby Toilets
          </Link>
        </div>
      </div>
    </div>
  );
}
