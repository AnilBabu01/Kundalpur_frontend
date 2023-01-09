import React, { useState } from "react";

function ChangeStatus() {
  const [approvevalue, setapprovevalue] = useState("");
  return (
    <>
      <div className="dashboarddiv">
        <div className="main_center_header1">
          <label>Status</label>
          <select
            className="inner-input-div1-select "
            id="type"
            name="mode"
            value={approvevalue}
            onChange={(e) => setapprovevalue(e.target.value)}
          >
            <option value={0}>Unapprove</option>
            <option value={0}>approve</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default ChangeStatus;
