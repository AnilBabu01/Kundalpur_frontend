import React, { useState, useEffect } from "react";
import { backendApiUrl } from "../../../../config/config";
import { serverInstance } from "../../../../API/ServerInstance";
import Swal from "sweetalert2";
import axios from "axios";
import "./ReceiptMater.css";
function ReceiptMater() {
  const [eleReceiptNo, seteleReceiptNo] = useState("");
  const [cacgReceiptNo, setcacgReceiptNo] = useState("");
  const [itemReceiptNo, setitemReceiptNo] = useState("");
  const [chequeReceiptNo, setchequeReceiptNo] = useState("");
  const [eleReceipts, seteleReceipts] = useState("");
  const [cachReceipts, setcachReceipts] = useState("");
  const [itemReceipts, setitemReceipts] = useState("");
  const [chequeReceipts, setchequeReceipts] = useState("");

  console.log(eleReceipts);
  const handleSubmit = async () => {
    try {
      axios.defaults.headers.post[
        "Authorization"
      ] = `Bearer ${sessionStorage.getItem("token")}`;
      if (eleReceiptNo) {
        const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
          receipt: eleReceiptNo,
          type: 1,
        });
        if (res.data.status === true) {
          Swal.fire(
            "Great!",
            "Electronic receiptNo. Added Successfully",
            "success"
          );
        }
      }
      if (cacgReceiptNo) {
        console.log(cacgReceiptNo);
        const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
          receipt: eleReceiptNo,
          type: 2,
        });
        if (res.data.status === true) {
          Swal.fire("Great!", "Cach receiptNo. Added Successfully", "success");
        }
      }
      if (itemReceiptNo) {
        const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
          receipt: eleReceiptNo,
          type: 3,
        });
        if (res.data.status === true) {
          Swal.fire("Great!", "Item receiptNo. Added Successfully", "success");
        }
      }
      if (chequeReceiptNo) {
        const res = await axios.post(`${backendApiUrl}admin/create-receipt`, {
          receipt: eleReceiptNo,
          type: 4,
        });
        if (res.data.status === true) {
          Swal.fire(
            "Great!",
            "Cheque receiptNo. Added Successfully",
            "success"
          );
        }
      }
    } catch (error) {
      Swal.fire("Error!", error, "error");
    }
  };

  const getReceiptNo = () => {
    try {
      serverInstance("admin/get-receipt", "get").then((res) => {
        if (res.status) {
          console.log("ress", res.data);
          seteleReceipts(res.data);
        }
      });
    } catch (error) {
      Swal.fire("Error", error, "error");
    }
  };
  useEffect(() => {
    getReceiptNo();
  }, []);

  return (
    <div>
      <div className="main_reciept_master">
        <div className="right_input_label">
          <div className="ineear_dave_receipt_no">
            <label htmlFor="eleReceiptNo">
              Enter reciept no for electronic donation
            </label>
            <input
              type="text"
              id="eleReceiptNo"
              value={eleReceiptNo}
              name="eleReceiptNo"
              onChange={(e) => seteleReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="cacgReceiptNo">
              Enter reciept no for cach donation
            </label>
            <input
              type="text"
              id="cacgReceiptNo"
              value={cacgReceiptNo}
              name="cacgReceiptNo"
              onChange={(e) => setcacgReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="itemReceiptNo">
              Enter reciept no for Item donation
            </label>
            <input
              type="text"
              id="itemReceiptNo"
              value={itemReceiptNo}
              name="itemReceiptNo"
              onChange={(e) => setitemReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
          <div className="ineear_dave_receipt_no">
            <label htmlFor="chequeReceiptNo">
              Enter reciept no for cheque donation
            </label>
            <input
              type="text"
              id="chequeReceiptNo"
              value={chequeReceiptNo}
              name="chequeReceiptNo"
              onChange={(e) => setchequeReceiptNo(e.target.value)}
            />
            <button onClick={() => handleSubmit()}>Save</button>
          </div>
        </div>

        <div className="table_div_recipt">
          <div>
            <div>1</div>
            <div>2</div>
          </div>
          <div>
            <div>1</div>
            <div>2</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptMater;
