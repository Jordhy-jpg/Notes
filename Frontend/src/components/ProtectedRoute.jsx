import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useState, useEffect } from "react";
import "../styles/LoadingIndicator.css";

function ProtectedRoute({ children }) {
  const [isAuthorized, set_isAuthorized] = useState(null);

  const refreshToken = async () => {
    const refreshTokenValue = localStorage.getItem(REFRESH_TOKEN);

    try {
      const res = await api.post("/api/token/refresh", {
        refresh: refreshTokenValue,
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

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);

      if (!token) {
        set_isAuthorized(false);
        return;
      }

      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;
      const now = Date.now() / 1000; //by default in ms, have to divide by 1000 to get seconds

      if (tokenExpiration < now) {
        await refreshToken();
      } else {
        set_isAuthorized(true);
      }
    };

    auth().catch(() => set_isAuthorized(false));

  }, []);

  if (isAuthorized === null) {
    return (
      <div className="loading-page">
        <div className="loading-content">
          <div className="loading-spinner"></div>
          <p className="loading-text">Opening your notebook...</p>
          <p className="loading-subtext">Just a moment</p>
        </div>
      </div>
    );
  }

  return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
