import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../screens/Admin/Dashboard/Dashboard";
import MasterTap from "../screens/Admin/masters/MasterTap";
import DonatedUsers from "../screens/Admin/Donatedusers/DonatedUsers";
import RoomBooking from "../screens/Admin/RoomBooking/RoomBooking";
import Donation from "../screens/Admin/Donation/Donation/Donation";
import AllDonationTap from "../screens/Admin/Donation/Alldonations/AllDonationTap";
import RoleManagement from "../screens/Admin/SystemManagement/RoleManagement/RoleManagement";
import UserManagement from "../screens/Admin/SystemManagement/UserManagement/UserManagement";
import VoucherManagement from "../screens/Admin/SystemManagement/VoucherManagement/VoucherManagement";
import InfoElectronic from "../screens/Admin/Donation/Donation/InfoElectronic";
import Cheque from "../screens/Admin/Reports/Cheque/Cheque";
import Online from "../screens/Admin/Reports/Online/Online";
import Electronic from "../screens/Admin/Reports/Electornic/Electornic";
import Userinfo from "../screens/Admin/masters/Usermaster/Userinfo";
import Updateuser from "../screens/Admin/masters/Usermaster/Updateuser";
import Adminprivateroute from "../components/AdminOutlate/Adminprivateroute";
import ChangeStatus from "../screens/Admin/Reports/Cheque/ChangeStatus";
import UpdateDonationType from "../screens/Admin/masters/Donationmaster/UpdateDonationType";
import Chequeinfo from "../screens/Admin/Reports/Cheque/Chequeinfo";
function AdminRoutes({ setopendashboard }) {
  return (
    <>
      <Routes>
        <Route
          path="/admin-panel/dashboard"
          element={
            <Adminprivateroute>
              <Dashboard setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/master"
          element={
            <Adminprivateroute>
              <MasterTap setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/donatedusers"
          element={
            <Adminprivateroute>
              <DonatedUsers setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/roombooking"
          element={
            <Adminprivateroute>
              <RoomBooking setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/alldonation"
          element={
            <Adminprivateroute>
              <AllDonationTap setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/donation"
          element={
            <Adminprivateroute>
              <Donation setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/rolemanagement"
          element={
            <Adminprivateroute>
              <RoleManagement setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/usermanagement"
          element={
            <Adminprivateroute>
              <UserManagement setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/vouchermanagement"
          element={
            <Adminprivateroute>
              <VoucherManagement setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/infoElectronic/:id"
          element={
            <Adminprivateroute>
              <InfoElectronic setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/reports/online"
          element={
            <Adminprivateroute>
              <Online setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/reports/cheque"
          element={
            <Adminprivateroute>
              <Cheque setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/reports/electronic"
          element={
            <Adminprivateroute>
              <Electronic setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/masters/userinfo"
          element={
            <Adminprivateroute>
              <Userinfo setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/masters/updateuser"
          element={
            <Adminprivateroute>
              <Updateuser setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/reports/changeStatus/:id"
          element={
            <Adminprivateroute>
              <ChangeStatus setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/reports/chequeinfo"
          element={
            <Adminprivateroute>
              <Chequeinfo setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/masters/updateDonationType/:id"
          element={
            <Adminprivateroute>
              <UpdateDonationType setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
