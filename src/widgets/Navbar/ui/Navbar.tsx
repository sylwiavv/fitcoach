import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { to: "/", label: "Dashboard" },
    { to: "/clients", label: "Clients" },
    { to: "/user", label: "My Profile" },
  ];

  const activeIndex = links.findIndex((link) => link.to === location.pathname);
  const [gliderPosition, setGliderPosition] = useState(activeIndex);

  useEffect(() => {
    setGliderPosition(activeIndex);
  }, [activeIndex]);

  return (
    <div className="flex justify-center items-center gap-4">
      <h4 className="font-bold text-xl text-eerieBlack">FitCoach</h4>
      <div>
        <div className="relative flex bg-ghost-white shadow-sm p-1 rounded-full w-[600px] max-w-[90%] transition-all">
          {gliderPosition >= 0 && (
            <span
              className="absolute top-1 left-1 h-[46px] w-[calc(33.33%-0.5rem)] bg-honey-dew rounded-full transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${gliderPosition * 100}%)`,
              }}
            />
          )}

          {links.map((link, index) => (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              className={`relative flex-1 z-10 h-[48px] flex items-center justify-center font-medium text-lg rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "text-eerieBlack font-semibold"
                  : "text-gray-500 hover:text-eerieBlack hover:bg-vanilla hover:cursor-pointer"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
