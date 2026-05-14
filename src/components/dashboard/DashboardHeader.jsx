import { User, LogOut, UserCircle } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ProfileModal } from "./ProfileModal";

export function DashboardHeader() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleLogout = () => {
    fetch("http://localhost:3000/signout", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: window.sessionStorage.getItem("token"),
      },
    })
      .then((resp) => resp.json())
      .then((resp) => {
        if (resp === "success") {
          window.sessionStorage.removeItem("token");
          sessionStorage.removeItem("user");
          navigate("/");
        }
      });
  };

  return (
    <>
      <header className="relative z-20  backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ParaSightAI
              </h1>
            </div>

            {/* Navigation */}
            {/* <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors">
              Profile
            </a>
          </nav> */}

            {/* User Avatar with Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <User className="w-5 h-5 text-white" />
              </div>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg backdrop-blur-md bg-white/90 border border-white/20 shadow-xl overflow-hidden">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setIsProfileModalOpen(true);
                        console.log("View Profile clicked");
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3 transition-colors"
                    >
                      <UserCircle className="w-4 h-4 text-purple-600" />
                      View Profile
                    </button>
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        handleLogout();
                        console.log("Logout clicked");
                      }}
                      className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-purple-50 flex items-center gap-3 transition-colors"
                    >
                      <LogOut className="w-4 h-4 text-purple-600" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
