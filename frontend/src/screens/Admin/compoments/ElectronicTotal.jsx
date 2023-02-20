import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Converter, hiIN } from 'any-number-to-words';
export const tableTotalCellStyles = {
  paddingInline: '10px',
  paddingBlock: '4px',
  outline: '1px solid #C4C4C4',

  // top:{

  //   paddingInline:'4px',
  //   paddingBlock:'4px',
  //   outline: '1px solid #C4C4C4'
  // },
  // bottom:{
  //   paddingInline:'4px',
  //   paddingBlock:'4px',
  //   outline: '1px solid #C4C4C4',
  //   outlineTop:'none'
  // }
};

const ElectronicTotal = ({ data }) => {
  let totalAmount = 0;
  if (data) {
    data &&
      data.map((item, inx) => {
        totalAmount =
          totalAmount +
          item.elecItemDetails.reduce(
            (n, { amount }) => parseFloat(n) + parseFloat(amount),
            0,
          );
      });
  }
  const converter = new Converter(hiIN);
  return (
    <>
      <TableRow>
        {/* <TableCell style={tableTotalCellStyles}>
          <Typography variant="body1" fontSize={14}>
            Total
          </Typography>
        </TableCell> */}
        <TableCell style={tableTotalCellStyles} colSpan={5}>
          <Typography variant="body1" fontSize={14}>
            {'₹' + totalAmount + '/-'}
          </Typography>
        </TableCell>
      </TableRow>
    </>
  );
};

export default ElectronicTotal;
