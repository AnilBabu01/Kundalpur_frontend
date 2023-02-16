import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import MainAdmin from '../src/screens/Admin/MainAdmin/MainAdmin';
import Navbar from './screens/User/Header/Navbar';
import Footer from './screens/User/Footer/Footer';
import MainRoutes from './routes/MainRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './Redux/redux/action/AuthAction';
import './i18n';
function App() {
  const dispatch = useDispatch();
  const [opendashboard, setopendashboard] = useState(false);
  const [showreciept, setshowreciept] = useState(false);
  const [noHeaderFooter, setHeaderFooter] = useState(false);
  const [paymentId, setpaymentId] = useState('');
  const [onlineId, setonlineId] = useState('');
  const [showRoomOptions, setshowRoomOptions] = useState(false);
  if (!sessionStorage.getItem('token')) {
  }

  const gett = () => {
    dispatch(loadUser());
  };

  useEffect(() => {
    gett();
    setHeaderFooter(false);
    setshowreciept(false);
    setopendashboard(false);
  }, []);

  return (
    <>
      <Router>
        {!opendashboard && !showreciept && !noHeaderFooter ? (
          <Navbar showRoomOptions={showRoomOptions} />
        ) : (
          ''
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
