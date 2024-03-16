import { KeyboardArrowDown } from "@mui/icons-material";
import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { TokenExpired } from "../../config/tokenDecoded";

const UserInfo = () => {
  const userDATA = JSON.parse(localStorage.getItem("user"));
  const [anchorEl, setAnchorEl] = useState(null);
  const token = TokenExpired();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <div className="flex items-center gap-3">
        <div>
          <img
            className="w-[40px] h-[40px] "
            src={
              userDATA.profilePic === ""
                ? "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
                : userDATA.profilePic
            }
            alt=""
          />
        </div>
        <div>
          <button onClick={handleClick}>
            <p className="flex font-semibold capitalize text-lg gap-1">
              {userDATA.firstName + " " + userDATA.lastName} <KeyboardArrowDown/>
            </p>
            <p className="text-sm font-medium text-gray-600">Node JS Developer</p>
          </button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            getContentAnchorEl={null}
          >
            {/* Add menu items as needed */}
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
