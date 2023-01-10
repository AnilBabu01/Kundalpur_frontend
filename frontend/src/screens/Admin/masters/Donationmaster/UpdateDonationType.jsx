import React, { useState, useEffect } from "react";
import { backendApiUrl } from "../../../../config/config";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
function UpdateDonationType({ setopendashboard }) {
  const location = useLocation();
  const { id } = useParams();
  const navigation = useNavigate();
  const [isData, setisData] = React.useState([]);
  const [donationtype_in_hindi, setdonationtype_in_hindi] = useState("");
  const [donationtype_in_eng, setdonationtype_in_eng] = useState("");
  console.log(isData);
  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.headers.put[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      const { data } = await axios.put(`${backendApiUrl}admin/donation-type`, {
        id: id,
        type_en: donationtype_in_eng,
        type_hi: donationtype_in_hindi,
      });
      if (data.status === true) {
        Swal.fire("Great!", "User Added Successfully", "success");
        navigation("/admin-panel/master");
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
      navigation("/admin-panel/master");
    }
  };

  useEffect(() => {
    if (location.state) {
      setisData(location.state?.data);
      setdonationtype_in_eng(location.state?.data.type_en);
      setdonationtype_in_hindi(location.state?.data.type_hi);
    } else {
      navigation("/admin-panel/master");
    }

    setopendashboard(true);
  }, []);
  return (
    <>
      <div className="dashboarddiv">
        <div className="main_uodate_div">
          <div className="main_center_header-update-donation">
            <div className="update-form">
              <form onSubmit={handlesubmit}>
                <div className="add-div-close-div">
                  <h2>Update Donation Type</h2>
                </div>
                <hr />
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
                  <button className="save-btn1">Update </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateDonationType;
