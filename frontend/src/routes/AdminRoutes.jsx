import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../screens/Admin/Dashboard/Dashboard';
import MasterTap from '../screens/Admin/masters/MasterTap';
import DonatedUsers from '../screens/Admin/Donatedusers/DonatedUsers';
import RoomBooking from '../screens/Admin/RoomBooking/RoomBooking';
import Donation from '../screens/Admin/Donation/Donation/Donation';
import RoleManagement from '../screens/Admin/SystemManagement/RoleManagement/RoleManagement';
import UserManagement from '../screens/Admin/SystemManagement/UserManagement/UserManagement';
import VoucherManagement from '../screens/Admin/SystemManagement/VoucherManagement/VoucherManagement';
import InfoElectronic from '../screens/Admin/Donation/Donation/InfoElectronic';
import Cheque from '../screens/Admin/Reports/Cheque/Cheque';
import Online from '../screens/Admin/Reports/Online/Online';
import Userinfo from '../screens/Admin/masters/Usermaster/Userinfo';
import Updateuser from '../screens/Admin/masters/Usermaster/Updateuser';
import Adminprivateroute from '../components/AdminOutlate/Adminprivateroute';
import ChangeStatus from '../screens/Admin/Reports/Cheque/ChangeStatus';
import UpdateDonationType from '../screens/Admin/masters/Donationmaster/UpdateDonationType';
import EmployeeUserInfo from '../screens/Admin/SystemManagement/UserManagement/EmployeeUserInfo';
import Assign from '../screens/Admin/SystemManagement/Assign/Assign';
import Chequeinfo from '../screens/Admin/Reports/Cheque/Chequeinfo';
import Request from '../screens/Admin/SystemManagement/Request/Request';
import Electronic from '../screens/Admin/Reports/Electornic/Electornic';
import Itemdonation from '../screens/Admin/Reports/Itemdonation/Itemdonation';
import ManualCash from '../screens/Admin/Reports/manualCash/ManualCash';
import ManualCheque from '../screens/Admin/Reports/ManualCheque/ManualCheque';
import PrintContent from '../screens/Admin/compoments/PrintContent';
import AllReport from '../screens/Admin/Reports/AllReport/AllReport';
import ManualDonation from '../screens/Admin/Donation/ManualDonation/ManualDonation';
import PrintContentManul from '../screens/Admin/compoments/PrintContentManual';
function AdminRoutes({ setopendashboard, setshowreciept }) {
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
          path="/admin-panel/donation"
          element={
            <Adminprivateroute>
              <Donation setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/manualdonation"
          element={
            <Adminprivateroute>
              <ManualDonation setopendashboard={setopendashboard} />
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
          path="/admin-panel/assign"
          element={
            <Adminprivateroute>
              <Assign setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/request"
          element={
            <Adminprivateroute>
              <Request setopendashboard={setopendashboard} />
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
          path="/admin-panel/reports/manualcash"
          element={
            <Adminprivateroute>
              <ManualCash setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/reports/manualcheque"
          element={
            <Adminprivateroute>
              <ManualCheque setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/reports/manualitem"
          element={
            <Adminprivateroute>
              <Itemdonation setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/reports/printcontent"
          element={
            <Adminprivateroute>
              <PrintContent
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
              />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/printContentmanul"
          element={
            <Adminprivateroute>
              <PrintContentManul
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
              />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/reports/allreport"
          element={
            <Adminprivateroute>
              <AllReport
                setopendashboard={setopendashboard}
                setshowreciept={setshowreciept}
              />
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
        <Route
          path="/admin-panel/masters/employeeUserInfo"
          element={
            <Adminprivateroute>
              <EmployeeUserInfo setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
