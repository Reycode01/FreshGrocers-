import React from 'react';
import './CustomerList.css';

const CustomerList = ({ cart = [], totalAmount = 0 }) => {
  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <li key={index}>
              {product.name} - ${product.price.toFixed(2)}
            </li>
          ))
        ) : (
          <li>No products in the cart</li>
        )}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default CustomerList;




