import React, { useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { NavLink, Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./Sidebar.css";
const Sidebar = ({ setshowsidebar }) => {
  const [showdropdownmenu1, setshowdropdownmenu1] = useState(false);
  const [showdropdownmenu2, setshowdropdownmenu2] = useState(false);
  const [showdropdownmenu3, setshowdropdownmenu3] = useState(false);
  return (
    <>
      <div className="maindiv">
        <div className="adminlogodiv">
          <p>K-donation-system</p>
        </div>
        <nav className="navbar">
          <ul className="nav-menu">
            <li className="nav-item" onClick={() => setshowsidebar(!true)}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : "nav-link-no-dropdown"
                }
                to="/admin-panel/dashboard"
              >
                <DashboardIcon style={{ marginRight: "1rem" }} />
                <span className="linkspan"> Dashboard</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setshowdropdownmenu2(!showdropdownmenu2)}
              >
                Donation
                {showdropdownmenu2 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
            </li>

            <div className={showdropdownmenu2 ? "showmenu" : "hidemenu"}>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : "nav-link"
                  }
                  to="/admin-panel/donation"
                >
                  Electronic Donation
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : "nav-link"
                  }
                  to="/admin-panel/alldonation"
                >
                  Reports
                </NavLink>
              </li>
            </div>

            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setshowdropdownmenu1(!showdropdownmenu1)}
              >
                System Management
                {showdropdownmenu1 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
            </li>

            <div className={showdropdownmenu1 ? "showmenu" : "hidemenu"}>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : "nav-link"
                  }
                  to="/admin-panel/rolemanagement"
                >
                  Role Management
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : "nav-link"
                  }
                  to="/admin-panel/usermanagement"
                >
                  User Management
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : "nav-link"
                  }
                  to="/admin-panel/vouchermanagement"
                >
                  Generate Voucher
                </NavLink>
              </li>
            </div>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : "nav-link-no-dropdown"
                }
                to="/admin-panel/donatedusers"
              >
                <span className="linkspan">Donated users</span>
              </NavLink>
            </li>

            <li className="nav-item">
              <div
                className="nav-link"
                onClick={() => setshowdropdownmenu3(!showdropdownmenu3)}
              >
                Masters
                {showdropdownmenu3 ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              </div>
            </li>

            <div className={showdropdownmenu3 ? "showmenu" : "hidemenu"}>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : "nav-link"
                  }
                  to="/admin-panel/master"
                >
                  Master
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "active-nav-link" : "nav-link"
                  }
                  to="/ALLDonations"
                >
                  Others Master
                </NavLink>
              </li>
            </div>
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "active-nav-link" : "nav-link-no-dropdown"
                }
                to="/admin-panel/roombooking"
              >
                <span className="linkspan">Room Booking</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
