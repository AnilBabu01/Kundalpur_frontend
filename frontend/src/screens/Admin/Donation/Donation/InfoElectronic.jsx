import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Donation.css";
function InfoElectronic() {
  const location = useLocation();
  const [isData, setisData] = React.useState(null);

  console.log(isData);
  if (location.state) {
    setisData(location.state?.data);
  } else {
    navigation("/admin-panel/donation");
  }
  return (
    <>
      <div className="dashboarddiv"> InfoElectronic</div>
    </>
  );
}

export default InfoElectronic;
