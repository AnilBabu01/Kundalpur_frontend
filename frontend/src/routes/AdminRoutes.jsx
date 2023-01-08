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
function AdminRoutes({ setopendashboard }) {
  return (
    <>
      <Routes>
        <Route
          path="/admin-panel/dashboard"
          element={<Dashboard setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/master"
          element={<MasterTap setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/donatedusers"
          element={<DonatedUsers setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/roombooking"
          element={<RoomBooking setopendashboard={setopendashboard} />}
        />

        <Route
          path="/admin-panel/alldonation"
          element={<AllDonationTap setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/donation"
          element={<Donation setopendashboard={setopendashboard} />}
        />

        <Route
          path="/admin-panel/rolemanagement"
          element={<RoleManagement setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/usermanagement"
          element={<UserManagement setopendashboard={setopendashboard} />}
        />

        <Route
          path="/admin-panel/vouchermanagement"
          element={<VoucherManagement setopendashboard={setopendashboard} />}
        />

        <Route
          path="/admin-panel/infoElectronic/:id"
          element={<InfoElectronic setopendashboard={setopendashboard} />}
        />

        <Route
          path="/admin-panel/reports/online"
          element={<Online setopendashboard={setopendashboard} />}
        />
        <Route
          path="/admin-panel/reports/cheque"
          element={<Cheque setopendashboard={setopendashboard} />}
        />

        <Route
          path="/admin-panel/reports/electronic"
          element={<Electronic setopendashboard={setopendashboard} />}
        />

        <Route
          path="/admin-panel/masters/userinfo"
          element={<Userinfo setopendashboard={setopendashboard} />}
        />

        <Route
          path="/admin-panel/masters/updateuser/:id"
          element={<Updateuser setopendashboard={setopendashboard} />}
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
