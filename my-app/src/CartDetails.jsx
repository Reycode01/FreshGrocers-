import React from 'react';
import './CartDetails.css';

const CartDetails = ({ cart = [], totalAmount = 0 }) => {
  return (
    <div className="cart-details">
      <h2>Cart Details</h2>
      <ul>
        {cart.length > 0 ? (
          cart.map((product, index) => (
            <li key={index}>
              {product.name} - ${product.price.toFixed(2)} x {product.initialQuantity}
            </li>
          ))
        ) : (
          <li>No items in the cart</li>
        )}
      </ul>
      <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
    </div>
  );
};

export default CartDetails;


