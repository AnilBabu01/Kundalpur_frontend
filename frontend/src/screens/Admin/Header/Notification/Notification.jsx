import React from "react";
import NotiCard from "./NotiCard";
import NotiTap from "./NotiTap";
import CloseIcon from "@mui/icons-material/Close";

function Notification({ handleClose1 }) {
  return (
    <>
      <div>
        <div className="close_note_div">
          <h2>Notification</h2>
          <span onClick={handleClose1}>
            <CloseIcon />
          </span>
        </div>
        <div style={{ width: "100%", overflowY: "auto", height: "400px" }}>
          <div className="main_notification_main">
            <NotiTap />
          </div>
        </div>
      </div>
    </>
  );
}

export default Notification;
