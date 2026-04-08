import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../API";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
  const [isAuthorized, set_isAuthorized] = useState(null);

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await api.post("/api/token/refresh/", {
          refresh: localStorage.getItem(REFRESH_TOKEN),
        });
        if (res.status === 200) {
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
          set_isAuthorized(true);
        } else {
          set_isAuthorized(false);
        }
      } catch (error) {
        console.log(error);
        set_isAuthorized(false);
      }
    };

    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        set_isAuthorized(false);
        return;
      } else {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) await refreshToken();
        else set_isAuthorized(true);
      }
    };

    auth().catch(() => set_isAuthorized(false));
  }, []);

  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
