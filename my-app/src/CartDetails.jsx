import React from 'react';
import './CartDetails.css';

const CartDetails = ({ cart, totalAmount, onDeleteFromBucket }) => {
  return (
    <div className="cart-details">
      <h2>Cart Details</h2>
      <div className="cart-details-container">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-details-item" key={index}>
              <img src={item.image} alt={item.name} className="cart-details-item-image" />
              <div className="cart-details-item-info">
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
        <button className="checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default CartDetails;





















