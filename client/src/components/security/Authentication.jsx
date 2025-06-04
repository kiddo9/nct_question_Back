import React, { useContext, useEffect } from "react";
import Api from "../../api/Api";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useRoleHook from "../../hooks/roleHook";


export const UserContext = React.createContext(null);


const AuthenticationProvider = ({ children }) => {
  const nav = useNavigate();
  const {getRoles,loader} = useRoleHook()
  const [user, setUser] = React.useState({
    name: "", 
    email: "", 
    role: "", 
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
        const theUser ={
          ...response.data.user,
          role: getRoles?.find((role) => {
            return role.id == response.data.user.roles;
          }).roles
        } 
        // console.log("theUser", theUser);
        setUser(theUser);
      });
    } catch (error) {
      // nav("/auth/admin/login");
      toast.error(
        "Seems like you have lost internet connection. Try again later."
      );
      console.error("Authentication error:", error);
    }
  }, [loader, getRoles, nav]);

  

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
