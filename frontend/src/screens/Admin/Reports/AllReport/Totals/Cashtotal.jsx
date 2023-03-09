import React, { useEffect } from 'react';

function Cashtotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.manual_cash_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.manual_cash_TOTAL_AMOUNT;
        }

        if (item.elec_cash_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.elec_cash_TOTAL_AMOUNT;
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default Cashtotal;
