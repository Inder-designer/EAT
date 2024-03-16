import JwtDecode, { jwtDecode }  from "jwt-decode";
import { useNavigate } from "react-router-dom";

  export const isTokenExpired = () => {
    const token = localStorage.getItem("accessToken");
  
    if (!token) {
      // If token is missing, consider it expired
      return true;
    }
  
    try {
      const decodedTokenn = jwtDecode(token); // Replace with your JWT decoding logic
      const expirationTime = decodedTokenn.exp * 1000; // Convert seconds to milliseconds
  
      // Compare the expiration time with the current time
      return expirationTime < Date.now();
    } catch (error) {
      // Handle decoding errors or other issues
      console.error("Error decoding token:", error);
      return true;
    }
  };
  export const TokenExpired = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("accessToken");
    try {
      const decodedTokenn = jwtDecode(token); // Replace with your JWT decoding logic
      const expirationTime = decodedTokenn.exp * 1000; // Convert seconds to milliseconds
      const tokenExpire = expirationTime < Date.now()
      // Compare the expiration time with the current time
      if (tokenExpire) {
        navigate('/')
        window.location.reload()
      }else{
        return `Bearer ${token}`;
      }
    } catch (error) {
      // Handle decoding errors or other issues
      console.error("Error decoding token:", error);
      return true;
    }
  };

  