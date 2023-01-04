import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { serverInstance } from "../../../../API/ServerInstance";
import "./Donation.css";
function InfoElectronic({ setopendashboard }) {
  const { id } = useParams();
  const [isData, setisData] = React.useState(null);
  console.log(isData);
  const getinfo = () => {
    serverInstance(`user/get-elecdonation?id=${id}`, "get").then((res) => {
      if (res.status) {
        setisData(res.data);
      } else {
        Swal("Error", "somthing went  wrong", "error");
      }
    });
  };
  useEffect(() => {
    getinfo();
    setopendashboard(true);
  }, []);

  return (
    <>
      <div className="dashboarddiv">
        <div className="center_info_main">
          <div className="main_content_info">
            <div>
              <p style={{ marginBottom: "1rem" }}>Personal Details</p>
              <p>name: {isData ? isData.name : ""}</p>
              <p>Phone No: {isData ? isData.phoneNo : ""}</p>
              <p>Donation Time: {isData ? isData.address : ""}</p>
              <p>Donation Date: {isData ? isData.donation_date : ""}</p>
              <p>Donation Time: {isData ? isData.donation_time : ""}</p>
            </div>
            <div>
              <p style={{ marginTop: "2rem", marginBottom: "1rem" }}>
                No Of Donations
              </p>
              <div className="table_scrol_barrr">
                <table class="styled-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: "center", width: "21rem" }}>
                        Type of donation
                      </th>
                      <th style={{ textAlign: "center", width: "27rem" }}>
                        Amout
                      </th>
                      <th style={{ textAlign: "center" }}>Remark</th>
                    </tr>
                  </thead>
                  <tbody>
                    {isData &&
                      isData.elecItemDetails.map((item) => {
                        return (
                          <tr>
                            <td>{item.type}</td>
                            <td>{item.amount}</td>
                            <td>{item.remark}</td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default InfoElectronic;
