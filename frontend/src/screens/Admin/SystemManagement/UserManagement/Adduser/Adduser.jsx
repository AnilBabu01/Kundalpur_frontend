import React, { useEffect, useState } from "react";
import { backendApiUrl } from "../../../../../config/config";
import { serverInstance } from "../../../../../API/ServerInstance";
import Swal from "sweetalert2";
import axios from "axios";
import "./Adduser.css";

const Adduser = ({ setOpen }) => {
  const [username, setusername] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [address, setaddress] = useState("");
  const [role, setrole] = useState("");
  const [Dmax, setDmax] = useState("");
  const [max, setmax] = useState("");
  const [Cashier, setCashier] = useState(false);
  const [status, setstatus] = useState(false);
  const [cancelCheckout, setcancelCheckout] = useState(false);
  const [CreditAA, setCreditAA] = useState("");
  const [DebitAA, setDebitAA] = useState("");
  const [DCreditAA, setDCreditAA] = useState("");

  const handlesubmit = async (e) => {
    try {
      e.preventDefault();
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      if (
        username
        // password &&
        // email &&
        // mobile &&
        // max &&
        // role &&
        // Cashier &&
        // status &&
        // cancelCheckout &&
        // CreditAA &&
        // DebitAA &&
        // DCreditAA &&
        // Dmax &&
        // address
      ) {
        const res = await axios.post(`${backendApiUrl}admin/add-employee`, {
          Username: username,
          Mobile: mobile,
          Email: email,
          Address: address,
          Password: password,
          DmaxPTD: Dmax,
          MaxPDA: max,
          Role: role,
          Cashier: Cashier === "true" ? true : false,
          Status: status === "true" ? true : false,
          cancelCheckout: cancelCheckout === "true" ? true : false,
          CreditAA: CreditAA,
          DebitAA: DebitAA,
          DCreditAA: DCreditAA,
        });
        console.log(res.data);
        if (res.data.status === true) {
          Swal.fire("Great!", res.data.message, "success");
          setOpen(false);
        }
        if (res.data.status === false) {
          Swal.fire("Error!", res.data.message, "error");
          setOpen(false);
        }
      }
    } catch (error) {
      Swal.fire("Error!", error.response.data.message, "error");
      setOpen(false);
    }
  };

  return (
    <>
      <div className="cash-donation-div">
        <form onSubmit={handlesubmit}>
          <div
            className="cash-donation-container-innser"
            style={{ paddingLeft: "2rem" }}
          >
            <div className="form-div">
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="username">Username</label>
                  <input
                    text="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setusername(e.target.value)}
                    className="forminput_add_user"
                  />
                  <label htmlFor="mobile">Mobile No</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    value={mobile}
                    onChange={(e) => setmobile(e.target.value)}
                    className="forminput_add_user"
                  />
                </div>
              </div>
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <labe htmlFor="email" l>
                    Email Address
                  </labe>
                  <input
                    text="email"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    className="forminput_add_user"
                  />
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setaddress(e.target.value)}
                    className="forminput_add_user"
                  />
                </div>
              </div>
            </div>
            <div className="form-div">
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label>Password</label>
                  <input
                    htmlFor="password"
                    text="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    className="forminput_add_user"
                  />
                  <label htmlFor="Dmax">DMax Previous Transaction Days</label>
                  <input
                    type="text"
                    id="Dmax"
                    name="Dmax"
                    value={Dmax}
                    onChange={(e) => setDmax(e.target.value)}
                    className="forminput_add_user"
                  />
                </div>
              </div>
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="role"> User Role</label>
                  <select
                    className="inner-input-div1-select_add"
                    type="text"
                    id="role"
                    name="role"
                    value={role}
                    onChange={(e) => setrole(e.target.value)}
                  >
                    <option value="None">Select Role</option>
                    <option value="Administrator">Administrator</option>
                    <option value="Donation And Bookingr">
                      Donation And Booking
                    </option>
                    <option value="Room Booking">Room Booking</option>
                    <option value="Accounts">Accounts</option>
                    <option value="Store">Store</option>
                    <option value="Super Admin">Super Admin</option>
                    <option value="Manual Donation">Manual Donation</option>
                    <option value="Elect Donation">Elect Donation</option>
                  </select>
                  <label htmlFor="max">Max Previous Donation Allowed</label>
                  <input
                    type="text"
                    id="max"
                    name="max"
                    value={max}
                    onChange={(e) => setmax(e.target.value)}
                    className="forminput_add_user"
                  />
                </div>
              </div>
            </div>
            <div className="form-div">
              <div className="form-input-div_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="Cashier">Is Cashier</label>
                  <select
                    className="inner-input-div1-select_add"
                    id="Cashier"
                    name="Cashier"
                    value={Cashier}
                    onChange={(e) => setCashier(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                  <label htmlFor="status">Status</label>
                  <select
                    className="inner-input-div1-select_add"
                    id="status"
                    name="status"
                    value={status}
                    onChange={(e) => setstatus(e.target.value)}
                  >
                    <option value="None">Status</option>
                    <option value={true}>Active</option>
                    <option value={false}>De-Active</option>
                  </select>
                </div>
              </div>
              <div className="form-input-div_add_user_add_user">
                <div className="inner-input-div2">
                  <label htmlFor="cancelCheckou">Can Cancle Checkout?</label>
                  <select
                    className="inner-input-div1-select_add"
                    id="cancelCheckou"
                    name="cancelCheckou"
                    value={cancelCheckout}
                    onChange={(e) => setcancelCheckout(e.target.value)}
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="Full_input">
              <label htmlFor="CreditAA">Credit Assigned Accounts *</label>
              <input
                type="text"
                id="CreditAA"
                name="CreditAA"
                value={CreditAA}
                onChange={(e) => setCreditAA(e.target.value)}
              />
            </div>
            <div>
              <input type="checkbox" /> Select All
            </div>
            <div className="Full_input">
              <label htmlFor="DebitAA">Debit Assigned Accounts *</label>
              <input
                type="text"
                id="DebitAA"
                name="DebitAA"
                value={DebitAA}
                onChange={(e) => setDebitAA(e.target.value)}
              />
            </div>
            <div className="Full_input">
              <label htmlFor="DCreditAA">Credit Assigned Accounts *</label>
              <input
                type="text"
                id="DCreditAA"
                name="DCreditAA"
                value={DCreditAA}
                onChange={(e) => setDCreditAA(e.target.value)}
              />
            </div>
            <div>
              <input type="checkbox" /> Select All
            </div>
            <div className="save-div-btn">
              <button className="save-btn1">Save</button>
              <button onClick={() => setOpen(false)} className="calcel-btn1">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Adduser;
