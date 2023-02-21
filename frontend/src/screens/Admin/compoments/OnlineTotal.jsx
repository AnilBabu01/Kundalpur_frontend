import React from 'react';
import Typography from '@mui/material/Typography';

const OnlineTotal = ({ data }) => {
  let totalAmount = 0;
  //   if (data) {
  //     data &&
  //       data.map((item, inx) => {
  //         totalAmount =
  //           totalAmount +
  //           item.AMOUNT.reduce(
  //             (n, { amount }) => parseFloat(n) + parseFloat(amount),
  //             0,
  //           );
  //       });
  //   }

  return (
    <>
      <Typography variant="body1" fontSize={14}>
        {'₹' + totalAmount + '/-'}
      </Typography>
    </>
  );
};

export default OnlineTotal;
