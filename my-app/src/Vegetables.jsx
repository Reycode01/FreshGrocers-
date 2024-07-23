import React, { useState } from 'react';
import './Vegetables.css';
import managuImage from './assets/managu.jpg';
import potatoesImage from './assets/potatoes.png';
import peasImage from './assets/Peas.jpg';
import sagaImage from './assets/saga.jpg';

const initialVegetables = [
  { id: 7, name: 'Managu', image: managuImage, price: 20, quantityLabel: 'per Bunch', initialQuantity: 1 },
  { id: 9, name: 'Potatoes', image: potatoesImage, price: 250, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 10, name: 'Peas', image: peasImage, price: 250, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 11, name: 'Saga', image: sagaImage, price: 20, quantityLabel: 'per Bunch', initialQuantity: 1 },
];

const Vegetables = ({ onAddToBucket, onDone }) => {
  const [vegetables, setVegetables] = useState(initialVegetables);
  const [bucket, setBucket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleQuantityChange = (id, increment) => {
    const updatedVegetables = vegetables.map(veg => {
      if (veg.id === id) {
        const newQuantity = veg.initialQuantity + increment;
        return { ...veg, initialQuantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return veg;
    });
    setVegetables(updatedVegetables);
  };

  const handleAddToBucket = (veg) => {
    const existingProduct = bucket.find(item => item.id === veg.id);
    if (existingProduct) {
      const updatedBucket = bucket.map(item =>
        item.id === veg.id ? { ...item, initialQuantity: item.initialQuantity + veg.initialQuantity } : item
      );
      setBucket(updatedBucket);
    } else {
      setBucket([...bucket, veg]);
    }
    setTotalAmount(bucket.reduce((acc, item) => acc + item.price * item.initialQuantity, 0));
    onAddToBucket(veg);
  };

  const handleCalculateTotal = () => {
    const total = bucket.reduce((acc, veg) => acc + veg.price * veg.initialQuantity, 0);
    setTotalAmount(total);
    onDone();
  };

  return (
    <div className="vegetables-container">
      <h2>Vegetables</h2>
      <div className="product-list">
        {vegetables.map((veg) => (
          <div key={veg.id} className="product-card">
            <img src={veg.image} alt={veg.name} className="product-image" />
            <h3>{veg.name}</h3>
            <p className="product-price">Ksh. {veg.price}</p>
            <p className="product-quantity">Quantity: {veg.quantityLabel}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(veg.id, -1)}>-</button>
              <span>{veg.initialQuantity}</span>
              <button onClick={() => handleQuantityChange(veg.id, 1)}>+</button>
            </div>
            <p>Total Price: Ksh. {veg.price * veg.initialQuantity}</p>
            <button onClick={() => handleAddToBucket(veg)} className="add-to-bucket">Add to Bucket</button>
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

export default Vegetables;
