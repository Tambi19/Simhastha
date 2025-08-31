import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import mandirImg from "../assets/mandir.jpg";
import logo from "../assets/logo.png";

export default function ScanLanding() {
  const buttonsRef = useRef([]);
  const logoRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      buttonsRef.current,
      { scale: 0 },
      {
        scale: 1.1,
        duration: 0.6,
        ease: "back.out(2)",
        stagger: 0.2,
        delay: 0.8,
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

    gsap.fromTo(
      logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
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
      <div className="absolute inset-0 bg-white/60"></div>

      <div className="absolute top-4 left-4 z-20">
        <img
          ref={logoRef}
          src={logo}
          alt="Sanitrack Logo"
          className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 drop-shadow-lg"
        />
      </div>

      <div className="relative z-10 flex flex-col items-center mt-16">
        <h1 className="text-4xl font-bold text-black mb-8 text-center">
          आपका एक कदम, लाखों के लिए स्वच्छता 🙏
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
          >
            🙋 I am a Pilgrim
          </Link>

          {/* ✅ Cleaners go to auth with role=cleaner */}
          <Link
            ref={(el) => (buttonsRef.current[1] = el)}
            to="auth/register?role=cleaner"
            className={`${buttonStyle} bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-blue-200`}
          >
            🧹 I am a Cleaner
          </Link>


          {/* ✅ Volunteers go to auth with role=volunteer */}
          <Link
            ref={(el) => (buttonsRef.current[2] = el)}
            to="auth/register?role=volunteer"
            className={`${buttonStyle} bg-gradient-to-r from-purple-400 to-purple-600 text-black shadow-purple-300`}
          >
            🤝 I am a Volunteer
          </Link>

          <Link
            ref={(el) => (buttonsRef.current[3] = el)}
            to="/toilets"
            className={`${buttonStyle} bg-gradient-to-r from-yellow-400 to-yellow-600 text-white`}
          >
            🗺️ Nearby Toilets
          </Link>
        </div>
      </div>
    </div>
  );
}
