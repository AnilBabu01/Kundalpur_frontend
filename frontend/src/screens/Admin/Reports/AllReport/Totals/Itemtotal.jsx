import React, { useEffect } from 'react';

function Itemtotal({ data }) {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        if (item.manual_item_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.manual_item_TOTAL_AMOUNT;
        }

        if (item.elec_item_TOTAL_AMOUNT) {
          totalAmount = totalAmount + item.elec_item_TOTAL_AMOUNT;
        }
      });
  }

  return (
    <>
      <span>{totalAmount}</span>
    </>
  );
}

export default Itemtotal;
