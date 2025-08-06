import { useState, useEffect } from "react";

export default function Fetching({ preload }) {
  const [opacity, setOpacity] = useState(0.4);

  useEffect(() => {
    // Animation for fading in and out
    const fadeInterval = setInterval(() => {
      setOpacity((prev) => (prev === 0.4 ? 1 : 0.4));
    }, 2000);

    return () => clearInterval(fadeInterval);
  }, []);

  // Add required CSS for custom animations
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes spin-reverse {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(-360deg);
        }
      }
      
      .animate-spin-reverse {
        animation: spin-reverse 2s linear infinite;
      }
    `;
    document.head.appendChild(style);

    // Cleanup function to remove the style when component unmounts
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      className={`inset-0 flex justify-center items-center z-40 mt-20 ${
        preload == true ? "bg-[#ffffffb7]" : "bg-white"
      }`}
    >
      <div className="relative w-48 h-48">
        {/* Pulsing background */}
        {/* <div className="absolute w-full h-full rounded-full bg-blue-300 opacity-30 animate-pulse"></div> */}

        {/* Spinning circles */}
        {/* <div className="absolute w-full h-full rounded-full border-4 border-transparent border-t-white animate-spin"></div>
        <div className="absolute w-4/5 h-4/5 top-[10%] left-[10%] rounded-full border-4 border-transparent border-r-blue-400 animate-spin-reverse"></div> */}

        {/* Logo */}
        <div
          className="flex justify-center items-center transition-opacity duration-800"
          style={{ opacity: opacity }}
        >
          <div
            className="text-2xl font-bold text-white"
            style={{ textShadow: "0 0 10px #6699ff" }}
          >
            <img
              src="/Artboard 1 copy.png"
              alt=""
              className="w-16 h-16 shadow-2xl rounded-full object-cover opacity-30 animate-bounce"
              style={{ opacity: opacity }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}