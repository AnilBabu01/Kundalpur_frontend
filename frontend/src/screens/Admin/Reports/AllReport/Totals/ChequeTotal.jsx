import React, { useEffect } from 'react';

function ChequeTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.CHEQUE_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.CHEQUE_TOTAL_AMOUNT;
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default ChequeTotal;
