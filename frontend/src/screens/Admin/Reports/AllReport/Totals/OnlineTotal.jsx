import React, { useEffect } from 'react';

function OnlineTotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.ONLINE_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.ONLINE_TOTAL_AMOUNT;
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default OnlineTotal;
