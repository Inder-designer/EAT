import React, { useEffect, useState } from 'react'
import Main from './Main'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import AuthPage from '../pages/Auth/AuthPage';
import { isTokenExpired } from '../config/tokenDecoded';
import { jwtDecode } from 'jwt-decode';
import NewCalender from '../pages/Calender/NewCalender';
import Task from '../pages/task/Task';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Leave from '../pages/leave/Leave';
import ErrorPage from './ErrorPage';
const Layout = () => {
  const AppWrapper = () => {
    const navigate = useNavigate();
    const [isTokenValid, setIsTokenValid] = useState(true);
  
    // Declare 'token' at the beginning of the component
    const token = localStorage.getItem("accessToken");
  
    useEffect(() => {
      if (!token || isTokenExpired(token)) {
        // Token is missing or expired
        localStorage.clear();
        setIsTokenValid(false);
        navigate("/");
      } else {
        setIsTokenValid(true);
        console.log(isTokenExpired(token),"tokenqwertyuiop");
      }
    }, [token, navigate]);
  
    if (!isTokenValid) {
      // Render the AuthPage component if the token is missing or expired
      return <AuthPage/>;
    }
  
    try {
      const decoded = jwtDecode(token);
      console.log(token);
      // Use the decoded token as needed in your application
      console.log(decoded);
    } catch (error) {
      // Handle decoding errors
      console.error("Error decoding token:", error);
      // Token is not valid, navigate to AuthPage
      localStorage.clear();
      setIsTokenValid(false);
      navigate("/");
    }
  
    // Render the main App component if the token is valid
    return <Main />;
  };

  const router = createBrowserRouter([
    {
      path: "/",
        element: <AppWrapper />,
        errorElement: <ErrorPage/>,
      children: [
        {
          path: "/attendance",
          element: <NewCalender/>,
        },
        {
          path: "/",
          element: <Task/>,
        },
        {
          path: "/my-leaves",
          element: <Leave/>,
        },
      ],
    },
    // {
    //   path: "/reset-password",
    //   element: <ResetPassword/>
    // }
  ]);
  return (
    <div>
      <ToastContainer/>
      <RouterProvider router={router} />
    </div>
  )
}

export default Layout