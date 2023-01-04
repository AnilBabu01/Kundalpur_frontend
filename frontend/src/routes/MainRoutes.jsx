import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../screens/User/Home/Home";

import EmailLogin from "../screens/User/Auth/EmailLogin/EmailLogin";
import NewLogin from "../screens/User/Auth/NewLogin/NewLogin";
import Forgot from "../screens/User/Auth/Forgot/Forgot";
import CreatePassword from "../screens/User/Auth/createPassword/CreatePassword";
import Donation from "../screens/User/donation/Donation";
import Auth from "../screens/User/Auth/Auth";
import Profile from "../screens/User/profile/Profile";
import Reciept from "../screens/Admin/Reciept/Reciept";
import DonationHistory from "../screens/User/donationHistory/DonationHistory";
import ChangePassword from "../screens/User/ChangePassword/ChangePassword";
import PrivateRoutes from "../components/PrivateRoutes/PrivateRoutes";
function MainRoutes({ setopendashboard, setshowreciept }) {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<EmailLogin />} />
        <Route path="/phonelogin" element={<NewLogin />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/create" element={<CreatePassword />} />
        <Route path="/register" element={<Auth />} />

        <Route
          path="/profile"
          element={
            <PrivateRoutes>
              <Profile />
            </PrivateRoutes>
          }
        />
        <Route
          path="/donation"
          element={
            // route is protected
            <PrivateRoutes>
              <Donation />
            </PrivateRoutes>
          }
        />
        <Route
          path="/donationhistory"
          element={
            <PrivateRoutes>
              <DonationHistory
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/reciept"
          element={
            <PrivateRoutes>
              <Reciept
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
              />
            </PrivateRoutes>
          }
        />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
