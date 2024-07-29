import React, { useState } from 'react';
import './CartDetails.css';
import axios from 'axios';

const CartDetails = ({ cart, totalAmount, onDeleteFromBucket }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post('http://localhost:5000/api/mpesa', {
        phoneNumber,
        amount: totalAmount
      });
      console.log(response.data);
      alert('Payment initiated, check your phone to complete the payment.');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert(`Something went wrong: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

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
        <input
          type="text"
          placeholder="Enter your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <button className="checkout-btn" onClick={handleCheckout} disabled={isProcessing}>
          {isProcessing ? 'Processing...' : 'Checkout'}
        </button>
      </div>
    </div>
  );
};

export default CartDetails;
























