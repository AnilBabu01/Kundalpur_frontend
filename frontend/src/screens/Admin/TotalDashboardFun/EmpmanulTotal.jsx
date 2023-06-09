import React from 'react';

function EmpmanulTotal({ data }) {
  console.log('total calculate total', data);
  return (
    <>
      <span>
        ₹
        {data
          ? data.reduce((n, { total }) => parseFloat(n) + parseFloat(total), 0)
          : '0'}
      </span>
    </>
  );
}

export default EmpmanulTotal;
