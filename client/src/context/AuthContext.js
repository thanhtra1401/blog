import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  //login
  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8000/api/auth/login",
      inputs,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (res.data.success) {
      setCurrentUser(res.data.user);
    }
    return res;
  };

  //logout
  const logout = async () => {
    await axios.get("http://localhost:8000/api/auth/logout", {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    setCurrentUser(null);
  };
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  const data = { login, currentUser, logout };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
