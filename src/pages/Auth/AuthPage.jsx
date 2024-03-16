import React from "react";
import Login from "./Login";
import Signup from "./Signup"; // Import the Signup component
import { Box, Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ToastContainer } from "react-toastify";

const AuthPage = () => {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className="authPage w-full h-screen flex items-center flex-col pt-20">
        
      <ToastContainer />
      <TabContext value={value}>
        <Box sx={{ marginBottom: "30px" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Login" value="1" className="!font-semibold !text-xl" />
            <Tab label="Signup" value="2" className="!font-semibold !text-xl" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Login />
        </TabPanel>
        <TabPanel value="2">
          <Signup handleChange={handleChange}/>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default AuthPage;
