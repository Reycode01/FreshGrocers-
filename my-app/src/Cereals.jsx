import React, { useState } from 'react';
import './Cereals.css';
import maizeImage from './assets/Bucket.jpeg';
import beansImage from './assets/Beans Busket.png';
import grainedMaizeImage from './assets/Maize.jpeg';
import potatoesImage from './assets/potatoes.png';
import peasImage from './assets/Peas.jpg';
import mwitemaniaImage from './assets/Mwitemania.jpg';
import nyayoImage from './assets/Nyayo.jpg';
import wairimuImage from './assets/Wairimu.jpg';
import yelllowImage from './assets/Yellow beans.jpg';
import GreenImage from './assets/Green Beans.jpg';

// Initial Cereals data
const initialCereals = [
  { id: 1, name: 'Fresh Maize', image: maizeImage, price: 200, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 2, name: 'Mixed Beans', image: beansImage, price: 280, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 3, name: 'Grained Maize', image: grainedMaizeImage, price: 250, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 4, name: 'Potatoes', image: potatoesImage, price: 100, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 5, name: 'Peas', image: peasImage, price: 180, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 6, name: 'Mwitemania Beans', image: mwitemaniaImage, price: 300, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 7, name: 'Nyayo Beans', image: nyayoImage, price: 270, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 10, name: 'Wairimu Beans', image: wairimuImage, price: 260, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 11, name: 'Yellow Beans', image: yelllowImage, price: 300, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 12, name: 'Green Beans', image: GreenImage, price: 300, quantityLabel: 'per Kg', initialQuantity: 1 },
];

const Cereals = ({ onAddToBucket, onDone }) => {
  const [cereals, setCereals] = useState(initialCereals);
  const [bucket, setBucket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const handleQuantityChange = (id, increment) => {
    const updatedCereals = cereals.map(cereal => {
      if (cereal.id === id) {
        const newQuantity = cereal.initialQuantity + increment;
        return { ...cereal, initialQuantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return cereal;
    });
    setCereals(updatedCereals);
  };

  const handleAddToBucket = (cereal) => {
    const existingProduct = bucket.find(item => item.id === cereal.id);
    if (existingProduct) {
      const updatedBucket = bucket.map(item =>
        item.id === cereal.id ? { ...item, initialQuantity: item.initialQuantity + cereal.initialQuantity } : item
      );
      setBucket(updatedBucket);
    } else {
      setBucket([...bucket, cereal]);
    }
    setTotalAmount(bucket.reduce((acc, item) => acc + item.price * item.initialQuantity, 0));
    onAddToBucket(cereal);
  };

  const handleCalculateTotal = () => {
    const total = bucket.reduce((acc, cereal) => acc + cereal.price * cereal.initialQuantity, 0);
    setTotalAmount(total);
    onDone();
  };

  const filteredCereals = cereals.filter(cereal =>
    cereal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="cereals-container">
      <h2>Cereals</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="product-list">
        {filteredCereals.map((cereal) => (
          <div key={cereal.id} className="product-card">
            <img src={cereal.image} alt={cereal.name} className="product-image" />
            <h3>{cereal.name}</h3>
            <p className="product-price">Ksh. {cereal.price}</p>
            <p className="product-quantity">Quantity: {cereal.quantityLabel}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(cereal.id, -1)}>-</button>
              <span>{cereal.initialQuantity}</span>
              <button onClick={() => handleQuantityChange(cereal.id, 1)}>+</button>
            </div>
            <p>Total Price: Ksh. {cereal.price * cereal.initialQuantity}</p>
            <button onClick={() => handleAddToBucket(cereal)} className="add-to-bucket">Add to Bucket</button>
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

export default Cereals;









