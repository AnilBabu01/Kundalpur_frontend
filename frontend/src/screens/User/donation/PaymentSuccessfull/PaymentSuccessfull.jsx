import React from "react";
import images from "../../../../assets/images.png";
import { useNavigate } from "react-router-dom";
import "./PaymentSuccessfull.css";
function PaymentSuccessfull({
  handleClose,
  name,
  amount,
  recieptno,
  address,
  mat,
  remark,
}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="PaymentSuccessfull-main-div">
        <div className="PaymentSuccessfull-main-div-innear">
          <img src={images} alt=" images " />
          <p>Payment successful</p>
          <button
            onClick={() => {
              navigate("/reciept", {
                state: {
                  userdata: {
                    NAME: name,
                    AMOUNT: amount,
                    RECEIPT_NO: recieptno,
                    ADDRESS: address,
                    TYPE: mat,
                    REMARK: remark,
                  },
                },
              });
            }}
            className="done-btn"
          >
            Download Receipt
          </button>
          <button
            onClick={() => navigate("/donationhistory")}
            className="done-btn"
          >
            Go To Donation History
          </button>
          <button onClick={() => handleClose()} className="ok_btn">
            Ok
          </button>
        </div>
      </div>
    </>
  );
}

export default PaymentSuccessfull;
