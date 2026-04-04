import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN } from "../constants";
import api from "../API";

function Navbar() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First try to get username from JWT token
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.username) {
          setUsername(decoded.username);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log("Error decoding token:", error);
      }
    }

    // Fallback: fetch from API if not in token
    api.get("/api/user/me/")
      .then((res) => {
        setUsername(res.data.username);
      })
      .catch((error) => {
        console.log("Error fetching user:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <span className="text-3xl">📝</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Notes
            </h1>
          </a>

          <div className="flex items-center gap-4">
            {loading ? (
              <div className="w-24 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            ) : (
              <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="text-gray-700 font-medium">{username}</span>
              </div>
            )}
            
            <a
              href="/logout"
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
