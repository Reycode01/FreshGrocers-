import React, { useState } from 'react';
import './Fruits.css';
import bananaImage from './assets/banana.jpg';
import mangoesImage from './assets/mangoes.png';
import pineapplesImage from './assets/pineaples.jpg';
import sweetBananasImage from './assets/Sweetbananas.jpg';

const initialFruits = [
  { id: 2, name: 'Banana', image: bananaImage, price: 15, quantityLabel: '@', initialQuantity: 1 },
  { id: 5, name: 'Mangoes', image: mangoesImage, price: 20, quantityLabel: '@', initialQuantity: 1 },
  { id: 8, name: 'Pineapple', image: pineapplesImage, price: 100, quantityLabel: '@', initialQuantity: 1 },
  { id: 14, name: 'Sweet Bananas', image: sweetBananasImage, price: 300, quantityLabel: 'Bunch of 20', initialQuantity: 1 },
];

const Fruits = ({ onAddToBucket, onDone }) => {
  const [fruits, setFruits] = useState(initialFruits);
  const [bucket, setBucket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityChange = (id, increment) => {
    const updatedFruits = fruits.map(fruit => {
      if (fruit.id === id) {
        const newQuantity = fruit.initialQuantity + increment;
        return { ...fruit, initialQuantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return fruit;
    });
    setFruits(updatedFruits);
  };

  const handleAddToBucket = (fruit) => {
    const existingProduct = bucket.find(item => item.id === fruit.id);
    if (existingProduct) {
      const updatedBucket = bucket.map(item =>
        item.id === fruit.id ? { ...item, initialQuantity: item.initialQuantity + fruit.initialQuantity } : item
      );
      setBucket(updatedBucket);
    } else {
      setBucket([...bucket, fruit]);
    }
    setTotalAmount(bucket.reduce((acc, item) => acc + item.price * item.initialQuantity, 0));
    onAddToBucket(fruit);
  };

  const handleCalculateTotal = () => {
    const total = bucket.reduce((acc, fruit) => acc + fruit.price * fruit.initialQuantity, 0);
    setTotalAmount(total);
    onDone();
  };

  return (
    <div className="fruits-container">
      <h2>Fruits</h2>
      <div className="product-list">
        {fruits.map((fruit) => (
          <div key={fruit.id} className="product-card">
            <img src={fruit.image} alt={fruit.name} className="product-image" />
            <h3>{fruit.name}</h3>
            <p className="product-price">Ksh. {fruit.price}</p>
            <p className="product-quantity">Quantity: {fruit.quantityLabel}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(fruit.id, -1)}>-</button>
              <span>{fruit.initialQuantity}</span>
              <button onClick={() => handleQuantityChange(fruit.id, 1)}>+</button>
            </div>
            <p>Total Price: Ksh. {fruit.price * fruit.initialQuantity}</p>
            <button onClick={() => handleAddToBucket(fruit)} className="add-to-bucket">Add to Bucket</button>
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

export default Fruits;

