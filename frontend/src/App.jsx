import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainAdmin from '../src/screens/Admin/MainAdmin/MainAdmin';
import Navbar from './screens/User/Header/Navbar';
import Footer from './screens/User/Footer/Footer';
import MainRoutes from './routes/MainRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadUser,
  loadAdminprofile,
  loademployeeprofile,
} from './Redux/redux/action/AuthAction';
import './i18n';
function App() {
  const dispatch = useDispatch();
  const [opendashboard, setopendashboard] = useState(false);
  const [showreciept, setshowreciept] = useState(false);
  const [noHeaderFooter, setHeaderFooter] = useState(false);
  const [paymentId, setpaymentId] = useState('');
  const [onlineId, setonlineId] = useState('');
  const [userrole, setuserrole] = useState('');
  const [showRoomOptions, setshowRoomOptions] = useState(false);
  if (!sessionStorage.getItem('token')) {
  }

  const gett = () => {
    // if (userrole === 1) {
    //   dispatch(loadAdminprofile());
    // }

    if (userrole === 2) {
      dispatch(loadUser());
    }

    // if (userrole === 3) {
    //   dispatch(loademployeeprofile());
    // }
  };

  useEffect(() => {
    gett();

    setuserrole(Number(sessionStorage.getItem('userrole')));
  }, []);

  return (
    <>
      <Router>
        {showreciept ? (
          <></>
        ) : (
          <>
            {!opendashboard || noHeaderFooter || userrole === 2 ? (
              <Navbar showRoomOptions={showRoomOptions} />
            ) : (
              ''
            )}
          </>
        )}

        {opendashboard && <MainAdmin />}
        <MainRoutes
          setopendashboard={setopendashboard}
          setshowreciept={setshowreciept}
          setHeaderFooter={setHeaderFooter}
          paymentId={paymentId}
          setpaymentId={setpaymentId}
          onlineId={onlineId}
          setonlineId={setonlineId}
          setshowRoomOptions={setshowRoomOptions}
        />
        <AdminRoutes
          setopendashboard={setopendashboard}
          setshowreciept={setshowreciept}
        />
        {!opendashboard && !showreciept && !noHeaderFooter ? <Footer /> : ''}
      </Router>
    </>
  );
}

export default App;
