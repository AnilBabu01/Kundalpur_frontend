import React from 'react';

function ManaulTotal({ data }) {
  console.log('total calculate total', data);
  return (
    <>
      <p>
        ₹
        {data
          ? data.reduce((n, { total }) => parseFloat(n) + parseFloat(total), 0)
          : '0'}
      </p>
    </>
  );
}

export default ManaulTotal;
