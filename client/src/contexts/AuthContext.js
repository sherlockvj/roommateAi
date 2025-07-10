import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = jwtDecode(token);
        setUser({ id: payload.id, name: payload.name || payload.email });
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setLoadingUser(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};
