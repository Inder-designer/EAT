// import axios from "axios";
// import { isTokenExpired } from "./config/tokenDecoded";
// import { useNavigate } from "react-router-dom";

// const setupAxiosInterceptors = () => {
//   const navigate = useNavigate();

//   // Add a request interceptor
//   axios.interceptors.request.use(
//     (config) => {
//       // Check if the token is expired
//       if (isTokenExpired()) {
//         // Token is expired, redirect to AuthPage
//         navigate("/auth");
//         return Promise.reject("Token expired");
//       }

//       // If the token is valid, add the Authorization header to the request
//       const token = localStorage.getItem("accessToken");
//       config.headers.Authorization = token ? `Bearer ${token}` : "";
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );

//   // Add a response interceptor
//   axios.interceptors.response.use(
//     (response) => {
//       // If the response is successful, return it
//       return response;
//     },
//     (error) => {
//       // Handle HTTP errors or other issues here
//       if (error.response && error.response.status === 401) {
//         // If the server returns a 401 Unauthorized status, token may be expired
//         // Redirect to AuthPage
//         navigate("/auth"); 
//       }
//       return Promise.reject(error);
//     }
//   );
// };

// export default setupAxiosInterceptors;
