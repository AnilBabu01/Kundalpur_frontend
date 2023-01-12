import React, { useState, useEffect } from "react";
import { backendApiUrl } from "../../../../config/config";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
function ChangeStatus({ id, handleClose }) {
  const navigate = useNavigate();

  const [approvevalue, setapprovevalue] = useState("");
  console.log(id);

  const handlesubmit = async () => {
    try {
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;

      const res = await axios.post(`${backendApiUrl}admin/cheque-status`, {
        status: Number(approvevalue),
        id: id,
      });
      if (res.data.status) {
        Swal.fire("Great!", res.data.msg, "success");
        navigate("/admin-panel/reports/cheque");
        handleClose(false);
      }
      console.log(res);
    } catch (error) {}
  };

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <div>
          <div className="Status_main_div">
            <label>Status</label>
            <select
              className="inner-input-div1-select-cheque"
              id="type"
              name="mode"
              value={approvevalue}
              onChange={(e) => setapprovevalue(e.target.value)}
            >
              <option value={0}> Not approved</option>
              <option value={1}>Approved</option>
            </select>
            <button onClick={() => handlesubmit()}>Change</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ChangeStatus;
