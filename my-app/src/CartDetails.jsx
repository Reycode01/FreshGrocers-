import React from 'react';
import './CartDetails.css'; // Add styles as needed

const CartDetails = ({ bucket }) => {
  return (
    <div className="cart-details">
      <h2>Your Cart</h2>
      {bucket.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {bucket.map(item => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Quantity: {item.initialQuantity}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartDetails;
