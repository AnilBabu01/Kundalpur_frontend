import React, { useEffect, useState } from "react";
import { serverInstance } from "../../../API/ServerInstance";
import badebaba from "../../../assets/badebaba.jpg";
import { displayRazorpay } from "../../../RazorPay/RazorPay";
import PaymentSuccessfull from "./PaymentSuccessfull/PaymentSuccessfull";
import ChequeSuccessfull from "./chequeSuccessfull/ChequeSuccessfull";
import { backendApiUrl } from "../../../config/config";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "../../../Redux/redux/action/AuthAction";

import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Swal from "sweetalert2";
const formData = new FormData();
import "./Donation.css";
import { useJwt } from "react-jwt";
import { useAuth } from "../../../Context/AuthContext";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "12px",
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 2,
};
function Donation({ setshowreciept }) {
  const dispatch = useDispatch();
  const nagivate = useNavigate();
  const [mode, setmode] = useState("");
  const [amount, setamount] = useState("");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [formerror, setFormerror] = useState({});
  const [isData, setisData] = React.useState([]);
  const [cheqing, setcheqing] = useState("");
  const [donationdata, setDonationdata] = useState({
    name: "",
    chequeno: "",
    date_of_sub: "",
    name_of_bank: "",
    Remark: "",
    donationtype: "Please Select",
    selected: "",
    amount: "",
    address: "",
  });
  console.log("ssssssfrg", isData);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const auth = useAuth();
  const { user } = useSelector((state) => state.userReducer);
  console.log(user);
  if (donationdata.selected === "yes1" && !user.name) {
    nagivate("/profile");
  }
  const onChange = (e) => {
    setDonationdata({ ...donationdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    setFormerror(validate(donationdata));
    formData.set(
      "NAME",
      donationdata.selected === "yes1" && user.name
        ? user.name
        : donationdata.name
    );
    formData.set("MODE_OF_DONATION", mode === "Onilne" ? 1 : 2);
    formData.set("AMOUNT", amount);
    // formData.set("CHEQUE_NO", donationdata?.chequeno);
    formData.set("DATE_OF_CHEQUE", donationdata?.date_of_sub);
    formData.set("NAME_OF_BANK", donationdata?.name_of_bank);
    formData.set("DATE_OF_DAAN", new Date());
    formData.set("TYPE", donationdata?.donationtype);
    formData.set("REMARK", donationdata?.Remark);
    formData.set("ADDRESS", donationdata?.address);
    formData.set("CHEQUE_NO", donationdata?.chequeno);
    formData.set("chequeImg", cheqing);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    if (!sessionStorage.getItem("token")) {
      nagivate("/login");
      return false;
    }
    if (mode === "Onilne" && amount) {
      displayRazorpay(
        {
          ammount: amount,
          userid: 1,
        },
        (data) => {
          serverInstance("user/add-donation", "POST", {
            NAME:
              donationdata.selected === "yes1" && user.name
                ? user.name
                : donationdata.name,
            MODE_OF_DONATION: 1,
            AMOUNT: amount,
            CHEQUE_NO: donationdata?.chequeno,
            DATE_OF_CHEQUE: donationdata?.date_of_sub,
            NAME_OF_BANK: donationdata?.name_of_bank,
            DATE_OF_DAAN: new Date(),
            PAYMENT_ID: data.razorpay_order_id,
            TYPE: donationdata?.donationtype,
            REMARK: donationdata?.Remark,
            ADDRESS: donationdata?.address,
          }).then((res) => {
            if (res.status === true) {
              handleOpen();
            } else {
              Swal.fire("Error!", "Somthing went wrong!!", "error");
            }
          });
        }
      );
    }

    if (
      mode === "Cheque" &&
      donationdata.chequeno &&
      cheqing &&
      amount &&
      donationdata.date_of_sub &&
      donationdata.name_of_bank
    ) {
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;

      const res = await axios.post(
        `${backendApiUrl}user/add-donation`,

        formData
      );
      console.log(donationdata);

      if (res.data.status === true) {
        handleOpen1();
      } else {
        Swal.fire("Error!", "Mobile number already exist!!", "error");
      }
    }
  };
  useEffect(() => {}, [formerror, donationdata]);
  console.log(useJwt(sessionStorage.getItem("token")));
  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Please enter name";
    }
    if (donationdata.selected === "yes1" && !user.name) {
      errors.namesecond = "Please enter name";
    }
    if (!amount) {
      errors.amount = "Please enter amount";
    }

    if (values.donationtype === "Please Select") {
      errors.donationtype = "Please selection donation type";
    }

    if (!values.selected) {
      errors.selected = "Please donation for";
    }
    if (!values.chequeno) {
      errors.chequeno = "Please enter cheque no";
    }
    if (!values.date_of_sub) {
      errors.date_of_sub = "Plase enter date submission";
    }

    if (!values.name_of_bank) {
      errors.name_of_bank = "Please enter name of bank";
    }

    return errors;
  };
  const gett = () => {
    dispatch(loadUser());
  };
  const getall_donatiions = () => {
    try {
      serverInstance("admin/donation-type", "get").then((res) => {
        if (res.status) {
          setisData(res.data);

          console.log(res.data);
        } else {
          Swal("Error", "somthing went  wrong", "error");
        }
        console.log("sss", res);
      });
    } catch (error) {
      Swal.fire("Error!", error, "error");
    }
  };
  useEffect(() => {
    gett();
    getall_donatiions();
    setshowreciept(false);
  }, []);
  return auth.verify ? (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
      >
        <Fade in={open}>
          <Box sx={style}>
            <PaymentSuccessfull
              handleClose={handleClose}
              name={
                donationdata.selected === "yes1" && user.name
                  ? user.name
                  : donationdata.name
              }
              amount={amount}
              address={donationdata.address}
              mat={donationdata.donationtype}
              remark={donationdata.Remark}
              recieptno={"1"}
            />
          </Box>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
      >
        <Fade in={open1}>
          <Box sx={style}>
            <ChequeSuccessfull handleClose={handleClose} />
          </Box>
        </Fade>
      </Modal>

      <div className="supper-main-div">
        <div className="donation-top-img">
          <img src={badebaba} alt="badebaba" />
          <div className="donation-top-img-overlay">Donation</div>
        </div>

        <div className="supper-inear-main-div">
          <div className="main-form-div">
            <h2>Donate</h2>
            <div className="main-input-div">
              <div className="inner-checkbox-div">
                <div className="center_mobile_view">
                  <span>
                    Donation For :
                    <input
                      className="radio_btb"
                      type="radio"
                      name="selected"
                      value="yes1"
                      onChange={onChange}
                    />
                    Self
                    <input
                      className="radio_btb"
                      type="radio"
                      name="selected"
                      value="yes2"
                      onChange={onChange}
                    />
                    Someone
                  </span>
                  <p style={{ color: "red" }}>{formerror.selected}</p>
                </div>
              </div>
              <div className="inner-checkbox-div">
                <div className="center_mobile_view">
                  <span>
                    Donation Mode :
                    <input
                      className="radio_btb"
                      type="radio"
                      value="Onilne"
                      name="mode"
                      onChange={(e) => setmode(e.target.value)}
                    />
                    Onilne
                    <input
                      className="radio_btb"
                      type="radio"
                      value="Cheque"
                      name="mode"
                      onChange={(e) => setmode(e.target.value)}
                    />
                    Cheque
                  </span>

                  <p style={{ color: "red", marginTop: "5px" }}>
                    {donationdata.selected &&
                      !mode &&
                      "Please select donation mode"}
                  </p>
                </div>
              </div>
            </div>
            <div className="main-input-div">
              <div
                className={
                  donationdata.selected === "yes1" && user.name
                    ? "inner-input-div"
                    : formerror.name
                    ? "inner-input-div-input-red"
                    : "inner-input-div"
                }
              >
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full name"
                  value={
                    donationdata.selected === "yes1" && user.name
                      ? user.name
                      : donationdata.name
                  }
                  onChange={onChange}
                />
                {donationdata.selected === "yes1" && user.name ? (
                  ""
                ) : (
                  <p style={{ color: "red", marginTop: "5px" }}>
                    {formerror.name}
                  </p>
                )}
              </div>
              <div
                className={
                  formerror.donationtype
                    ? "inner-input-div-select-red"
                    : "inner-input-div"
                }
              >
                <label>Type of donation </label>
                <select
                  id="type"
                  name="donationtype"
                  value={donationdata.donationtype}
                  onChange={onChange}
                >
                  {isData &&
                    isData.map((item) => (
                      <option key={item.id} value={item.type_hi}>
                        {item.type_hi}
                      </option>
                    ))}
                </select>
                <p style={{ color: "red", marginTop: "5px" }}>
                  {formerror.donationtype}
                </p>
              </div>
            </div>
            {mode === "Onilne" && (
              <>
                <div>
                  <div className="main-input-div">
                    <div className="inner-input-div">
                      <label>Amount</label>
                      <input
                        type="text"
                        value={amount}
                        placeholder="Amount"
                        onChange={(e) => setamount(e.target.value)}
                      />

                      <p style={{ color: "red", marginTop: "5px" }}>
                        {formerror.amount}
                      </p>

                      <div
                        className="donation-money-div-main"
                        style={{ marginTop: "10px" }}
                      >
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("1111")}>
                            ₹1111
                          </button>
                          <button onClick={() => setamount("2121")}>
                            ₹2121
                          </button>
                          <button onClick={() => setamount("5151")}>
                            ₹5151
                          </button>
                        </div>
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("11111")}>
                            ₹11,111
                          </button>
                          <button onClick={() => setamount("21211")}>
                            ₹21,211
                          </button>
                          <button onClick={() => setamount("51511")}>
                            ₹51,511
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="inner-input-div">
                        <label>Address</label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          value={donationdata.address}
                          onChange={onChange}
                        />
                        <label style={{ marginTop: "1rem" }}>Remark</label>
                        <input
                          type="text"
                          name="Remark"
                          placeholder="Remark"
                          value={donationdata.Remark}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="save-div-btn">
                    <button
                      // disabled={
                      //   donationdata.donationtype &&
                      //   donationdata.selected &&
                      //   donationdata.address &&
                      //   donationdata.Remark
                      //     ? false
                      //     : true
                      // }
                      className="save-btn5"
                      onClick={handlesubmit}
                    >
                      Process to pay
                    </button>
                  </div>
                </div>
              </>
            )}
            {mode === "Cheque" && (
              <>
                <div>
                  <div className="main-input-div">
                    <div
                      className={
                        formerror.chequeno
                          ? "inner-input-div-input-red"
                          : "inner-input-div"
                      }
                    >
                      <label>Cheque No</label>
                      <input
                        type="text"
                        name="chequeno"
                        placeholder="Cheque No "
                        value={donationdata.chequeno}
                        onChange={onChange}
                      />
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {formerror.chequeno}
                      </p>
                    </div>
                    <div
                      className={
                        formerror.date_of_sub
                          ? "inner-input-div-input-red"
                          : "inner-input-div"
                      }
                    >
                      <label>Date</label>
                      <input
                        type="date"
                        name="date_of_sub"
                        placeholder="DOB"
                        value={donationdata.date_of_sub}
                        onChange={onChange}
                      />
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {formerror.date_of_sub}
                      </p>
                    </div>
                  </div>
                  <div className="main-input-div">
                    <div
                      className={
                        formerror.amount
                          ? "inner-input-div-input-red"
                          : "inner-input-div"
                      }
                    >
                      <label>Amout</label>
                      <input
                        type="text"
                        value={amount}
                        placeholder="Amount"
                        onChange={(e) => setamount(e.target.value)}
                      />
                      <p style={{ color: "red", marginTop: "5px" }}>
                        {formerror.amount}
                      </p>
                      <div
                        className="donation-money-div-main"
                        style={{ marginTop: "3px" }}
                      >
                        <div
                          className="btn-recharge-div"
                          style={{ arginBottom: "-8px" }}
                        >
                          <button onClick={() => setamount("1111")}>
                            ₹1111
                          </button>
                          <button onClick={() => setamount("2121")}>
                            ₹2121
                          </button>
                          <button onClick={() => setamount("5151")}>
                            ₹5151
                          </button>
                        </div>
                        <div className="btn-recharge-div">
                          <button onClick={() => setamount("11111")}>
                            ₹11,111
                          </button>
                          <button onClick={() => setamount("21211")}>
                            ₹21,211
                          </button>
                          <button onClick={() => setamount("51511")}>
                            ₹51,511
                          </button>
                        </div>
                        <label>Remark</label>
                        <input
                          type="text"
                          name="Remark"
                          placeholder="Remark"
                          value={donationdata.Remark}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                    <div
                      className={
                        formerror.name_of_bank
                          ? "inner-input-div-input-red"
                          : "inner-input-div"
                      }
                    >
                      <label>Upload Chueqe</label>
                      <input
                        type="file"
                        accept="image/*"
                        name="chqque_img"
                        placeholder="Bank Name"
                        onChange={(e) => {
                          setcheqing(e.target.files[0]);
                          console.log(e.target.files[0]);
                        }}
                      />

                      <div className="inner-input-div">
                        <label style={{ marginTop: "1rem" }}>Bank</label>
                        <input
                          type="text"
                          name="name_of_bank"
                          placeholder="name_of_bank"
                          value={donationdata.name_of_bank}
                          onChange={onChange}
                        />
                        <p style={{ color: "red", marginTop: "5px" }}>
                          {formerror.name_of_bank}
                        </p>
                      </div>
                      <div className="inner-input-div">
                        <label style={{ marginTop: "1rem" }}>Address</label>
                        <input
                          type="text"
                          name="address"
                          placeholder="Address"
                          value={donationdata.address}
                          onChange={onChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="main-input-div remark-divvv"
                    style={{ marginTop: "-25px" }}
                  ></div>

                  <div className="save-div-btn">
                    <button
                      onClick={handlesubmit}
                      className="save-btn"
                      // disabled={
                      //   donationdata.donationtype &&
                      //   donationdata.selected &&
                      //   donationdata.address &&
                      //   donationdata.Remark &&
                      //   donationdata.date_of_sub &&
                      //   donationdata.chequeno &&
                      //   donationdata.name_of_bank &&
                      //   cheqing
                      //     ? false
                      //     : true
                      // }
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>Loading ...</div>
  );
}

export default Donation;
