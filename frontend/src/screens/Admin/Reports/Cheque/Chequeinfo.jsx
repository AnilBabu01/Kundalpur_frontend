import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
function Chequeinfo({ setopendashboard }) {
  const location = useLocation();

  const [refetch, setrefetch] = useState(false);
  const [data, setdata] = useState([]);
  console.log(data);
  useEffect(() => {
    if (location.state) {
      setdata(location.state?.data);
    } else {
      navigation("/admin-panel/reports");
    }
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="dashboarddiv">
        <div className="main_center_header1">Chequeinfo</div>
      </div>
    </>
  );
}

export default Chequeinfo;
