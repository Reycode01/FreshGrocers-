import React from 'react';
import './CustomerList.css';

const CustomerList = ({ cart, totalAmount, onDeleteFromBucket }) => {
  return (
    <div className="customer-list">
      <h2>Customer List</h2>
      <div className="customer-list-container">
        {cart.length === 0 ? (
          <p>No items in the list.</p>
        ) : (
          cart.map((item, index) => (
            <div className="customer-list-item" key={index}>
              <img src={item.image} alt={item.name} className="customer-list-item-image" />
              <div className="customer-list-item-info">
                <p>{item.name}</p>
                <p>Quantity: {item.initialQuantity}</p>
                <p>Price: Ksh. {item.price.toFixed(2)}</p>
                <p>Total Price: Ksh. {(item.price * item.initialQuantity).toFixed(2)}</p>
                <button onClick={() => onDeleteFromBucket(index)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="total-amount">
        <h3>Total Amount: Ksh. {totalAmount.toFixed(2)}</h3>
        <button className="payment-btn">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default CustomerList;
















