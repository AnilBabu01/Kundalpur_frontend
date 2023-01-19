import React, { useState, useEffect } from "react";
import search from "../../../assets/search.svg";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { secondaryColor } from "../../../utils/colorVariables";
import Sidebar from "../Sidebar/Sidebar";
import { json, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.jpg";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { backendUrl } from "../../../config/config";
import Logout from "@mui/icons-material/Logout";
import Notification from "./Notification/Notification";
import "./AdminHeader.css";
const AdminHeader = () => {
  const navigate = useNavigate();
  const [showsidebar, setshowsidebar] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [anchorEl1, setAnchorEl1] = useState(false);
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl1(null);
  };
  const { user } = useSelector((state) => state.userReducer);
  const adminuser = sessionStorage.getItem("adminuser");

  console.log("admin", adminuser);
  const logout = () => {
    handleClose();
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("userrole");

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl1}
        id="account-menu"
        open={open1}
        // onClose={handleClose1}
        // onClick={handleClose1}

        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 22,
              height: 32,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Notification handleClose1={handleClose1} />
      </Menu>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={() => navigate("/changepassword")}>
          <ListItemIcon>
            <LockOpenIcon fontSize="small" />
          </ListItemIcon>
          Change Password
        </MenuItem>

        <Divider />
        <MenuItem onClick={() => logout()}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <div className="adminmainheader">
        <div className="adminnavbar">
          <div className="routetilem">
            <img
              src={logo}
              alt="logo"
              style={{ width: "70px", height: "45px" }}
            />
            <p>
              श्री दिगम्बर जैन सिद्धक्षेत्र कुण्डलगिरि , कुण्डलपुर जिला दमोह
              (म.प्र.)
            </p>
          </div>
          <div
            className="showburger"
            onClick={() => setshowsidebar(!showsidebar)}
          >
            {showsidebar ? <CloseIcon /> : <MenuIcon />}
          </div>
          <div className="rightmaindiv">
            <div className="searchmaindiv">
              <input type="text" placeholder="Search" />
              <button className="searchbtn">
                <img src={search} alt="search" />
              </button>
            </div>
            <div onClick={handleClick1} className="notificationdiv">
              <Badge badgeContent={4} color="primary" style={{ zIndex: 0 }}>
                <NotificationsIcon color="action" />
              </Badge>
            </div>

            <div className="profilemaindiv">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Avatar
                  alt={adminuser?.adminuser}
                  src={`${backendUrl}uploads/images/${user?.profile_image}`}
                  variant="rounded"
                  sx={{
                    width: 35,
                    height: 35,
                    marginRight: "11px",
                    marginTop: "5px",
                    marginLeft: "11px",
                  }}
                />
                <Typography
                  sx={{
                    size: "14px",
                    lineHeight: "17px",
                  }}
                >
                  {user?.name.slice(0, 1)}
                </Typography>
                <IconButton
                  size="small"
                  aria-label="more"
                  onClick={handleClick}
                >
                  <ArrowDropDownOutlinedIcon
                    size="large"
                    sx={{ color: secondaryColor }}
                  />
                </IconButton>
              </Box>
            </div>
          </div>
        </div>
        <div className={showsidebar ? "open" : "sliderdiv "}>
          <Sidebar setshowsidebar={setshowsidebar} />
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
