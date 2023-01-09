import React, { useState, useEffect } from "react";
import { backendApiUrl } from "../../../../config/config";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
function ChangeStatus({ setopendashboard }) {
  const navigate = useNavigate();
  const [approvevalue, setapprovevalue] = useState("");
  console.log(approvevalue);

  const handlesubmit = async () => {
    try {
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;

      const res = await axios.post(`${backendApiUrl}admin/cheque-status`, {
        status: approvevalue,
        id: "9",
      });
      if (res.data.status) {
        Swal.fire("Great!", res.data.msg, "success");
        navigate("/admin-panel/reports/cheque");
      }
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="dashboarddiv">
        <div className="main_center_header1">
          <div className="Status_main_div">
            <label>Status</label>
            <select
              className="inner-input-div1-select-cheque"
              id="type"
              name="mode"
              value={approvevalue}
              onChange={(e) => setapprovevalue(e.target.value)}
            >
              <option value={"0"}>Unapprove</option>
              <option value={"1"}>approve</option>
            </select>
            <button onClick={() => handlesubmit()}>Change</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeStatus;
