import React, { useContext, useEffect } from "react";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";


export const UserContext = React.createContext(null);


const AuthenticationProvider = ({ children }) => {
  const nav = useNavigate();
  const [user, setUser] = React.useState({
    name: "", 
    email: "", 
    roles: "", 
    loggedIn: 0
  });
  
  useEffect(() => {
    try {
      Api.get(`/`).then((response) => {
        if (response.data.status !== true) {
          console.log("false");
  
          nav("/auth/admin/login");
          return;
        }
        console.log("checked");
        setUser(response.data.user);
      });
    } catch (error) {
      // nav("/auth/admin/login");
      toast.error(
        "Seems like you have lost internet connection. Try again later."
      );
      console.error("Authentication error:", error);
    }
  }, []);

  

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthenticationProvider;

export const useAuth = () => {
  return useContext(UserContext);
}
