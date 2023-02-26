import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../screens/Admin/Dashboard/Dashboard';
import MasterTap from '../screens/Admin/masters/MasterTap';
import Donation from '../screens/Admin/Donation/Donation/Donation';
import RoleManagement from '../screens/Admin/SystemManagement/RoleManagement/RoleManagement';
import UserManagement from '../screens/Admin/SystemManagement/UserManagement/UserManagement';
import VoucherManagement from '../screens/Admin/SystemManagement/VoucherManagement/VoucherManagement';
import InfoElectronic from '../screens/Admin/Donation/Donation/InfoElectronic';
import Adminprivateroute from '../components/AdminOutlate/Adminprivateroute';
import ChangeStatus from '../screens/Admin/Reports/OnlineDonations/Cheque/ChangeStatus';
import UpdateDonationType from '../screens/Admin/masters/Donationmaster/UpdateDonationType';
import EmployeeUserInfo from '../screens/Admin/SystemManagement/UserManagement/EmployeeUserInfo';
import Assign from '../screens/Admin/SystemManagement/Assign/Assign';
import Chequeinfo from '../screens/Admin/Reports/OnlineDonations/Cheque/Chequeinfo';
import Request from '../screens/Admin/SystemManagement/Request/Request';
import PrintContent from '../screens/Admin/compoments/PrintContent';
import AllReport from '../screens/Admin/Reports/AllReport/AllReport';
import PrintContentManul from '../screens/Admin/compoments/PrintContentManual';
import ManualDonation from '../screens/Admin/Donation/ManualDonation/ManualDonation';
import Signature from '../screens/Admin/Signature/Signature';
import DonationReportTap from '../screens/Admin/Reports/DonationReport/DonationReportTap';
import ManualDonationTap from '../screens/Admin/Reports/ManualDonationReports/ManualDonationTap';
import OnlineTap from '../screens/Admin/Reports/OnlineDonations/OnlineTap';
import DharamshalaTap from '../screens/Admin/Dharamshala/DharamshalaTap';
import RoomBookingTap from '../screens/Admin/RoomBooking/RoomBookingTap';
import ProfileAdminAndEmp from '../screens/Admin/Profile/ProfileAdminAndEmp';
import ParticularUserVoucher from '../screens/Admin/SystemManagement/VoucherManagement/ParticularUserVoucher';
import SystemTap from '../screens/Admin/SystemManagement/SystemTap';
///electronic donation routes
import ManualCash from '../screens/Admin/Reports/DonationReport/manualCash/ManualCash';
import Itemdonation from '../screens/Admin/Reports/DonationReport/Itemdonation/Itemdonation';
import Consolidated from '../screens/Admin/Reports/DonationReport/Consolidated/Consolidated';
import Electornic from '../screens/Admin/Reports/DonationReport/Electornic/Electornic';
import ManualCheque from '../screens/Admin/Reports/DonationReport/ManualCheque/ManualCheque';
import HeadReport from '../screens/Admin/Reports/DonationReport/HeadReport/HeadReport';
/// manual donation routes
import Consolidated1 from '../screens/Admin/Reports/ManualDonationReports/Consolidated/Consolidated';
import HeadReport1 from '../screens/Admin/Reports/ManualDonationReports/HeadReport/HeadReport';
import ManualReports from '../screens/Admin/Reports/ManualDonationReports/ManaulReport/ManualReports';
import ManualCash1 from '../screens/Admin/Reports/ManualDonationReports/ManualCash/ManualCash';
import ManualElectronic from '../screens/Admin/Reports/ManualDonationReports/ManualElectronic/ManualElectronic';
import ManualItem1 from '../screens/Admin/Reports/ManualDonationReports/ManualItem/ManualItem';

///online donation routes

import Cheque from '../screens/Admin/Reports/OnlineDonations/Cheque/Cheque';
import Online from '../screens/Admin/Reports/OnlineDonations/Online/Online';

function AdminRoutes({ setopendashboard, setshowreciept }) {
  const [addleftmargin, setaddleftmargin] = useState(false);
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
          path="/admin-panel/masters"
          element={
            <Adminprivateroute>
              <MasterTap setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/system"
          element={
            <Adminprivateroute>
              <SystemTap setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/updateprofle"
          element={
            <Adminprivateroute>
              <ProfileAdminAndEmp setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/uservoucher"
          element={
            <Adminprivateroute>
              <ParticularUserVoucher setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
        <Route
          path="/admin-panel/electronicReports"
          element={
            <Adminprivateroute>
              <DonationReportTap setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/OnlineReports"
          element={
            <Adminprivateroute>
              <OnlineTap setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/Dharamshala"
          element={
            <Adminprivateroute>
              <DharamshalaTap setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/roombooking"
          element={
            <Adminprivateroute>
              <RoomBookingTap setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/manualReports"
          element={
            <Adminprivateroute>
              <ManualDonationTap setopendashboard={setopendashboard} />
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
        <Route
          path="/admin-panel/signature"
          element={
            <Adminprivateroute>
              <Signature setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/electronic/report/cash"
          element={
            <Adminprivateroute>
              <ManualCash setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/electronic/report/elec"
          element={
            <Adminprivateroute>
              <Electornic setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/electronic/report/item"
          element={
            <Adminprivateroute>
              <Itemdonation setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/electronic/report/cheque"
          element={
            <Adminprivateroute>
              <ManualCheque setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/electronic/report/headreport"
          element={
            <Adminprivateroute>
              <HeadReport setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/electronic/report/consolidated"
          element={
            <Adminprivateroute>
              <Consolidated setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/manual/report/cash"
          element={
            <Adminprivateroute>
              <ManualCash1 setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/manual/report/item"
          element={
            <Adminprivateroute>
              <ManualItem1 setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/manual/report/elec"
          element={
            <Adminprivateroute>
              <ManualElectronic setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/manual/report/cheque"
          element={
            <Adminprivateroute>
              <ManualReports setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/manual/report/headreport"
          element={
            <Adminprivateroute>
              <HeadReport1 setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/manual/report/consolidated"
          element={
            <Adminprivateroute>
              <Consolidated1 setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/online/report/online"
          element={
            <Adminprivateroute>
              <Online setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />

        <Route
          path="/admin-panel/online/report/cheque"
          element={
            <Adminprivateroute>
              <Cheque setopendashboard={setopendashboard} />
            </Adminprivateroute>
          }
        />
      </Routes>
    </>
  );
}

export default AdminRoutes;
