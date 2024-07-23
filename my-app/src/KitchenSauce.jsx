import React, { useState } from 'react';
import './KitchenSauce.css'; // Make sure this CSS file exists and is properly styled
import sauceImage from './assets/tomatoes collections.jpeg';
import tomatoesImage from './assets/tomatoes.jpg';
import onionsImage from './assets/Fresh ball onions.jpg';

const initialSauces = [
  { id: 13, name: 'Bucket of Kitchen Sauce', image: sauceImage, price: 300, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 12, name: 'Tomatoes', image: tomatoesImage, price: 15, quantityLabel: 'each', initialQuantity: 1 },
  { id: 4, name: 'Onions', image: onionsImage, price: 10, quantityLabel: '@', initialQuantity: 1 },
];

const KitchenSauce = ({ onAddToBucket, onDone }) => {
  const [sauces, setSauces] = useState(initialSauces);
  const [bucket, setBucket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityChange = (id, increment) => {
    const updatedSauces = sauces.map(sauce => {
      if (sauce.id === id) {
        const newQuantity = sauce.initialQuantity + increment;
        return { ...sauce, initialQuantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return sauce;
    });
    setSauces(updatedSauces);
  };

  const handleAddToBucket = (sauce) => {
    const existingProduct = bucket.find(item => item.id === sauce.id);
    if (existingProduct) {
      const updatedBucket = bucket.map(item =>
        item.id === sauce.id ? { ...item, initialQuantity: item.initialQuantity + sauce.initialQuantity } : item
      );
      setBucket(updatedBucket);
    } else {
      setBucket([...bucket, sauce]);
    }
    setTotalAmount(bucket.reduce((acc, item) => acc + item.price * item.initialQuantity, 0));
    onAddToBucket(sauce);
  };

  const handleCalculateTotal = () => {
    const total = bucket.reduce((acc, sauce) => acc + sauce.price * sauce.initialQuantity, 0);
    setTotalAmount(total);
    onDone();
  };

  return (
    <div className="kitchen-sauce-container">
      <h2>Kitchen Sauce</h2>
      <div className="product-list">
        {sauces.map((sauce) => (
          <div key={sauce.id} className="product-card">
            <img src={sauce.image} alt={sauce.name} className="product-image" />
            <h3>{sauce.name}</h3>
            <p className="product-price">Ksh. {sauce.price}</p>
            <p className="product-quantity">Quantity: {sauce.quantityLabel}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(sauce.id, -1)}>-</button>
              <span>{sauce.initialQuantity}</span>
              <button onClick={() => handleQuantityChange(sauce.id, 1)}>+</button>
            </div>
            <p>Total Price: Ksh. {sauce.price * sauce.initialQuantity}</p>
            <button onClick={() => handleAddToBucket(sauce)} className="add-to-bucket">Add to Bucket</button>
          </div>
        ))}
      </div>
      <button onClick={handleCalculateTotal} className="cart-btn">Done</button>
      {totalAmount > 0 && (
        <div className="total-amount-box">
          <p>Total Amount: Ksh. {totalAmount}</p>
        </div>
      )}
    </div>
  );
};

export default KitchenSauce;

