import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Converter, hiIN } from 'any-number-to-words';

const ManualTotal = ({ data }) => {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        totalAmount =
          totalAmount +
          item.manualItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          );
      });
  }
  const converter = new Converter(hiIN);
  return (
    <>
      <Typography variant="body1" fontSize={14}>
        {'₹' + totalAmount + '/-'}
      </Typography>
    </>
  );
};

export default ManualTotal;
