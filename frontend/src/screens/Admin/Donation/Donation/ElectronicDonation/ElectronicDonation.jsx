import React, { useEffect, useState } from "react";
import { backendApiUrl } from "../../../../../config/config";
import { typesOfDonation } from "./Data";
import axios from "axios";

import "./ElectronicDonation.css";

const CashDonation = ({ setOpen, setshowalert }) => {
  const [donationtype, setdonationtype] = useState("");
  const [amount, setamount] = useState("");
  const [remark, setremark] = useState("");
  const [name, setname] = useState("");
  const [address, setaddress] = useState("");
  const [new_member, setnew_member] = useState(false);
  const [phoneNo, setphoneNo] = useState("");
  const [noOfRows, setNoOfRows] = useState({ id: 1 });
  const [rowsData, setRowsData] = useState([noOfRows]);

  const [item, setitem] = useState([]);
  console.log(item, amount);

  const RemoveRow = (index) => {
    const data = rowsData.filter((i) => i.id !== index);

    setRowsData(data);
    console.log(index);
  };
  const itemClick = () => {
    // const id = item.length + 1;
    setitem((prev) => [
      ...prev,
      {
        amount: amount,
        remark: remark,
        type: donationtype,
      },
    ]);
    setdonationtype("");
    setamount("");
    setremark("");
  };
  const date = new Date();

  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  let hour = date.getHours();
  let min = date.getMinutes();
  const time = `${hour}:${min}`;
  const currentDate = `${year}-${month}-${day}`;

  const addelectronicdonation = async () => {
    let data;
    if (item.length === 0) {
      data = [
        {
          amount: amount,
          remark: remark,
          type: donationtype,
        },
      ];
    }

    if (item.length > 0) {
      itemClick();
      console.log("item from electronic", item);
    }

    axios.defaults.headers.post[
      "Authorization"
    ] = `Bearer ${sessionStorage.getItem("token")}`;

    const res = await axios.post(`${backendApiUrl}user/add-elecDonation`, {
      name: name,
      phoneNo: phoneNo,
      address: address,
      new_member: new_member,
      donation_date: currentDate,
      donation_time: time,
      donation_item: data ? data : item,
    });

    console.log(res.data.status);

    if (res.data.status === true) {
      setshowalert(true);
      setmsg(res.data.msg);
    } else {
      Swal.fire("Error!", "Somthing went wrong!!", "error");
    }
  };

  return (
    <>
      <div className="cash-donation-div">
        <div className="cash-donation-container-innser">
          <h2>Electronic Donation</h2>
          <div>
            <form onSubmit={addelectronicdonation}>
              <p>Voucher No:</p>
              <div className="form-input-div">
                <div className="inner-input-div2">
                  <label>Phone No:</label>
                  <input
                    text="text"
                    className="forminput"
                    placeholder="Enter phone no"
                    value={phoneNo}
                    name="phoneNo"
                    onChange={(e) => setphoneNo(e.target.value)}
                  />
                  <label>Donation Date:</label>
                  <input
                    type="text"
                    value={currentDate}
                    className="forminput"
                    name="todaydate"
                  />
                </div>

                <div className="inner-input-div2">
                  <label>Name:</label>
                  <input
                    type="text"
                    className="forminput"
                    placeholder="Full name"
                    value={name}
                    name="name"
                    onChange={(e) => setname(e.target.value)}
                  />
                  <label>Donation Time:</label>
                  <input
                    type="text"
                    value={`${time} PM`}
                    className="forminput"
                  />
                </div>
                <div className="inner-input-div3">
                  <div className="inner-input-div2">
                    <label>Address:</label>
                    <input
                      text="text"
                      className="forminput"
                      placeholder="Enter address"
                      value={address}
                      name="address"
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>

                  <div>
                    New Member:
                    <input
                      type="radio"
                      name="selected"
                      value="yes1"
                      onChange={() => setnew_member(false)}
                    />
                    No
                    <input
                      type="radio"
                      name="selected"
                      value="yes2"
                      onChange={() => setnew_member(true)}
                    />
                    Yes
                  </div>
                </div>
              </div>

              <div className="save-div-btn4">
                <button className="save-btn1">Save</button>
                <button onClick={() => setOpen(false)} className="calcel-btn1">
                  Cancel
                </button>
              </div>
            </form>
          </div>

          <div className="table_scrol_barrr">
            <table class="styled-table">
              <thead>
                <tr>
                  <th style={{ textAlign: "center", width: "21rem" }}>
                    Type of donation
                  </th>
                  <th style={{ textAlign: "center", width: "27rem" }}>Amout</th>
                  <th colspan="2" style={{ textAlign: "center" }}>
                    Remark
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      className="inner-input-div1-select "
                      id="type"
                      name="donationtype"
                      value={donationtype}
                      onChange={(e) => setdonationtype(e.target.value)}
                    >
                      {typesOfDonation.map((mode) => (
                        <option key={mode} value={mode}>
                          {mode}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="forminput1"
                      placeholder="Amout"
                      name="amount"
                      value={amount}
                      onChange={(e) => {
                        setamount(e.target.value);

                        console.log(e.target.value);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="forminput1"
                      placeholder="remark"
                      name="remark"
                      value={remark}
                      onChange={(e) => setremark(e.target.value)}
                    />
                  </td>
                  <td style={{ width: "8rem" }}></td>
                </tr>
                {rowsData.length > 1 &&
                  rowsData.slice(1).map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td>
                          {" "}
                          <select
                            className="inner-input-div1-select "
                            id="type"
                            name="mode"
                            value={donationtype}
                            onChange={(e) => setdonationtype(e.target.value)}
                          >
                            {typesOfDonation.map((mode) => (
                              <option key={mode} value={mode}>
                                {mode}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            className="forminput1"
                            placeholder="Amout"
                            name="amount"
                            value={amount}
                            onChange={(e) => {
                              setamount(e.target.value);

                              console.log(e.target.value);
                            }}
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            className="forminput1"
                            placeholder="remark"
                            name="remark"
                            value={remark}
                            onChange={(e) => setremark(e.target.value)}
                          />
                        </td>
                        <td
                          onClick={() => RemoveRow(item.id)}
                          style={{ width: "8rem" }}
                        >
                          Remove
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                <tr>
                  <td>Total</td>
                  <td>0.00</td>
                  <td colspan="2"></td>
                </tr>
              </tfoot>
            </table>
            <button
              onClick={() => {
                setNoOfRows({ id: noOfRows.id + 1 });
                rowsData.push(noOfRows);
                itemClick();
              }}
              className="add_itrm_btn"
            >
              Add Dontion Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CashDonation;
