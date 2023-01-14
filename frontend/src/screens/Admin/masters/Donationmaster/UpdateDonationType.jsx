import React, { useState, useEffect } from "react";
import { backendApiUrl } from "../../../../config/config";
import { useLocation, useParams, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import axios from "axios";
function UpdateDonationType({ data, handleClose3 }) {
  const location = useLocation();

  const navigation = useNavigate();
  const [isData, setisData] = React.useState([]);
  const [donationtype_in_hindi, setdonationtype_in_hindi] = useState("");
  const [donationtype_in_eng, setdonationtype_in_eng] = useState("");
  const [id, setid] = useState("");
  console.log("aaa", data.type_en);
  const handlesubmit = async () => {
    try {
      axios.defaults.headers.put[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      const res = await axios.put(`${backendApiUrl}admin/donation-type`, {
        id: id,
        type_en: donationtype_in_eng,
        type_hi: donationtype_in_hindi,
      });
      console.log(res);
      if (res.data.status === true) {
        Swal.fire("Great!", "User Added Successfully", "success");

        handleClose3();
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
      handleClose3();
    }
  };

  useEffect(() => {
    if (data) {
      setisData(data?.data);
      setdonationtype_in_eng(data.type_en);
      setdonationtype_in_hindi(data.type_hi);
      setid(data.id);
    }
  }, []);
  return (
    <>
      <div className="main_uodate_div">
        <div className="update-form">
          <div className="main-input-div1">
            <div className="inner-input-div1">
              <label htmlFor="donationtype_in_hindi">
                Enter donation type in hindi 
              </label>
              <input
                type="text"
                id="donationtype_in_hindi"
                value={donationtype_in_hindi}
                name="donationtype_in_hindi"
                onChange={(e) => setdonationtype_in_hindi(e.target.value)}
              />
              <label htmlFor="donationtype_in_eng">
                Enter donation type in english 
              </label>
              <input
                type="text"
                id="donationtype_in_eng"
                value={donationtype_in_eng}
                name="donationtype_in_eng"
                onChange={(e) => setdonationtype_in_eng(e.target.value)}
              />
            </div>
          </div>

          <div className="save-div-btn">
            <button onClick={() => handlesubmit()} className="save-btn1">
              Update{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateDonationType;
