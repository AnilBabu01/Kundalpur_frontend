import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../screens/User/Home/Home';
import EmailLogin from '../screens/User/Auth/EmailLogin/EmailLogin';
import NewLogin from '../screens/User/Auth/NewLogin/NewLogin';
import Forgot from '../screens/User/Auth/Forgot/Forgot';
import CreatePassword from '../screens/User/Auth/createPassword/CreatePassword';
import Donation from '../screens/User/donation/Donation';
import Auth from '../screens/User/Auth/Auth';
import Profile from '../screens/User/profile/Profile';
import DonationHistory from '../screens/User/donationHistory/DonationHistory';
import ChangePassword from '../screens/User/ChangePassword/ChangePassword';
import PrivateRoutes from '../components/PrivateRoutes/PrivateRoutes';
import AboutUs from '../screens/User/Aboutus/AboutUs';
import PaymentStatusPage from '../screens/User/PaymentStatusPage/PaymentStatusPage';
import Reciept from '../screens/Admin/Reciept/Reciept';
import ReceiptManual from '../screens/Admin/Reciept/RecieptManual';
import OnlineReceipt from '../screens/Admin/Reciept/OnlineReceipt';
import RoomBooking from '../screens/User/roombookings/RoomBooking';
import DharamDetails from '../screens/User/roombookings/DharamDetails/DharamDetails';
import RoomBookingscreen from '../screens/User/roombookings/RoomBookingscreen/RoomBookingscreen';
import PaymentSuccess from '../screens/User/roombookings/PaymentSuccess/PaymentSuccess';
function MainRoutes({
  setopendashboard,
  setshowreciept,
  setHeaderFooter,
  paymentId,
  setpaymentId,
  setonlineId,
  onlineId,
  setshowRoomOptions,
}) {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home setshowRoomOptions={setshowRoomOptions} />}
        />
        <Route path="/login" element={<EmailLogin />} />
        <Route path="/phonelogin" element={<NewLogin />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/create" element={<CreatePassword />} />
        <Route path="/register" element={<Auth />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/payment-status"
          element={
            <PaymentStatusPage
              setHeaderFooter={setHeaderFooter}
              setpaymentId={setpaymentId}
            />
          }
        />

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
              <Donation
                setshowreciept={setshowreciept}
                paymentId={paymentId}
                setonlineId={setonlineId}
              />
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
                setHeaderFooter={setHeaderFooter}
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
                onlineId={onlineId}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/onlinereceipt"
          element={
            <PrivateRoutes>
              <OnlineReceipt
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
                onlineId={onlineId}
              />
            </PrivateRoutes>
          }
        />
        <Route
          path="/manualreceipt"
          element={
            <PrivateRoutes>
              <ReceiptManual
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
              />
            </PrivateRoutes>
          }
        />

        <Route
          path="/roombooking"
          element={
            <PrivateRoutes>
              <RoomBooking />
            </PrivateRoutes>
          }
        />

        <Route
          path="/Dharamshala/Details"
          element={
            <PrivateRoutes>
              <DharamDetails />
            </PrivateRoutes>
          }
        />

        <Route
          path="/room/booking"
          element={
            <PrivateRoutes>
              <RoomBookingscreen />
            </PrivateRoutes>
          }
        />

        <Route
          path="/room/paymentsuccessfuly"
          element={
            <PrivateRoutes>
              <PaymentSuccess />
            </PrivateRoutes>
          }
        />
        <Route path="/changepassword" element={<ChangePassword />} />
      </Routes>
    </>
  );
}

export default MainRoutes;
