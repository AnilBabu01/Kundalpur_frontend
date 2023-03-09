import React, { useEffect } from 'react';

function Chequestotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.elec_cheque_TOTAL_AMOUNT) {
          totalAmount = totalAmount + elec_cheque_TOTAL_AMOUNT;
        }

        if (item.manual_cheque_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.manual_cheque_TOTAL_AMOUNT;
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default Chequestotal;
