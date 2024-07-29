import React, { useState } from 'react';
import './KitchenSauce.css';
import bucketImage from './assets/tomatoes collections.jpeg';
import tomatoesImage from './assets/tomatoes.jpg';
import onionsImage from './assets/Fresh ball onions.jpg';
import eggsImage from './assets/tray of eggs.jpg';

const initialKitchenSauces = [
  { id: 1, name: 'Bucket of Kitchen Sauce', image: bucketImage, price: 500, quantityLabel: 'per Bucket', initialQuantity: 1 },
  { id: 2, name: 'Tomatoes', image: tomatoesImage, price: 120, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 3, name: 'Onions', image: onionsImage, price: 90, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 4, name: 'Eggs', image: eggsImage, price: 300, quantityLabel: 'per Tray', initialQuantity: 1 },
];

const KitchenSauce = ({ onAddToBucket, onDone }) => {
  const [kitchenSauces, setKitchenSauces] = useState(initialKitchenSauces);
  const [bucket, setBucket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuantityChange = (id, increment) => {
    const updatedKitchenSauces = kitchenSauces.map(sauce => {
      if (sauce.id === id) {
        const newQuantity = sauce.initialQuantity + increment;
        return { ...sauce, initialQuantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return sauce;
    });
    setKitchenSauces(updatedKitchenSauces);
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

  const filteredKitchenSauces = kitchenSauces.filter(sauce =>
    sauce.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="kitchen-sauce-container">
      <h2>Kitchen Sauce</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="product-list">
        {filteredKitchenSauces.map((sauce) => (
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

 





