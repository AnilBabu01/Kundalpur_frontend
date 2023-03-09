import React, { useEffect } from 'react';

function ElecTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.manual_bank_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.manual_bank_TOTAL_AMOUNT;
        }

        if (item.elec_bank_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.elec_bank_TOTAL_AMOUNT;
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default ElecTotal;
