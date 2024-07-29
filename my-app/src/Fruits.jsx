import React, { useState } from 'react';
import './Fruits.css';
import bananaImage from './assets/banana.jpg';
import mangoesImage from './assets/mangoes.png';
import pineapplesImage from './assets/pineaples.jpg';
import sweetBananasImage from './assets/Sweetbananas.jpg';
import greenApplesImage from './assets/GreenApples.jpeg';
import GooseberriesImage from './assets/Gooseberries.webp';
import ApplesImage from './assets/Apples.jpg';
import redPlumsImage from './assets/South African Red Plums.webp';
import SouthAfricaGrapeImage from './assets/South Africa Red Globe Seeded Grapes .jpg';
import waterMelonImage from './assets/Watermelon.jpg';
import ovacadoesImage from './assets/Ovacadoes.jpg';
import lemonImage from './assets/Organiclemons.webp';

const initialFruits = [
  { id: 1, name: 'Banana', image: bananaImage, price: 50, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 2, name: 'Mangoes', image: mangoesImage, price: 70, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 3, name: 'Pineapples', image: pineapplesImage, price: 100, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 4, name: 'Sweet Bananas', image: sweetBananasImage, price: 60, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 5, name: 'Green Apples', image: greenApplesImage, price: 200, quantityLabel: '@10 pcs', initialQuantity: 1},
  { id: 6, name: 'Goose Berries', image: GooseberriesImage, price: 150, quantityLabel: '500 grams', initialQuantity: 1},
  { id: 7, name: 'Red Apples', image: ApplesImage, price: 200, quantityLabel: '@10 pcs', initialQuantity: 1},
  { id: 8, name: 'Red Plums', image: redPlumsImage, price: 150, quantityLabel:'500 grams', initialQuantity: 1},
  { id: 9, name: 'Seeded Red Grapes', image: SouthAfricaGrapeImage, price: 250, quantityLabel: '500 grams', initialQuantity: 1},
  { id: 10, name: 'Melon', image: waterMelonImage, price: 500, quantityLabel: '1 Melon', initialQuantity: 1},
  { id: 11, name: 'Ovacado', image: ovacadoesImage, price: 400, quantityLabel: 'per Kg', initialQuantity: 1},
  { id: 12, name: 'Organic Lemons', image: lemonImage, price: 20, quantityLabel: 'Each Lemon', initialQuantity: 1},
  

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




