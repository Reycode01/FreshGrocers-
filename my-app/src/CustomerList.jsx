// CustomerList.jsx
import React from 'react';

const CustomerList = ({ bucket, totalAmount }) => {
  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {bucket.map(product => (
          <li key={product.id}>
            {product.name} - Quantity: {product.initialQuantity} - Total Price: Ksh. {product.price * product.initialQuantity}
          </li>
        ))}
      </ul>
      <h3>Total Amount: Ksh. {totalAmount}</h3>
    </div>
  );
};

export default CustomerList;

