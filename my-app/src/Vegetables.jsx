import React, { useState } from 'react';
import './Vegetables.css';
import managuImage from './assets/managu.jpg';
import potatoesImage from './assets/potatoes.png';
import peasImage from './assets/Peas.jpg';
import sagaImage from './assets/saga.jpg';
import cucumbersImage from './assets/cucumbers.jpg';
import greenspoonImage from './assets/greenspoon .webp';
import cabbageImage from './assets/Cabbage.jpeg';
import carrotImage from './assets/carrots.jpg';
import arrowImage from './assets/arrowroots.webp';
import brocoliImage from './assets/Brocoli Florets.webp';
import frenchImage from './assets/Frenchbeans.webp';
import kalesImage from './assets/Kales Sukuma.jpeg';
import pumpkinImage from './assets/pumpkin.webp';
import sweetImage from './assets/Sweet potatoes.webp';
import spinachImage from './assets/spinach.png';
import slicedCarrotsImage from './assets/slicedcarrots.jpg';
import readyManaguImage from './assets/Readymanagu.jpg';
import slicedCabbageImage from './assets/slicedCabbage.jpg';
import readySagaImage from './assets/Readysagaa.jpg';

const initialVegetables = [
  { id: 7, name: 'Managu', image: managuImage, price: 20, quantityLabel: 'per Bunch', initialQuantity: 1 },
  { id: 9, name: 'Potatoes', image: potatoesImage, price: 250, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 10, name: 'Peas', image: peasImage, price: 250, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 11, name: 'Saga', image: sagaImage, price: 20, quantityLabel: 'per Bunch', initialQuantity: 1 },
  { id: 12, name: 'Cucumbers', image: cucumbersImage, price: 100, quantityLabel: 'per Bunch', initialQuantity: 1 },
  { id: 13, name: 'Greenspoon', image: greenspoonImage, price: 100, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 14, name: 'Cabbage', image: cabbageImage, price: 100, quantityLabel: 'Ball of Cabbage', initialQuantity: 1 },
  { id: 15, name: 'Carrots', image: carrotImage, price: 100, quantityLabel: '500 grams', initialQuantity: 1 },
  { id: 16, name: 'Arrow Roots', image: arrowImage, price: 250, quantityLabel: 'per kg', initialQuantity: 1 },
  { id: 17, name: 'Brocoli Florets', image: brocoliImage, price: 150, quantityLabel: '500 grams', initialQuantity: 1 },
  { id: 18, name: 'French Beans', image: frenchImage, price: 150, quantityLabel: '500 grams', initialQuantity: 1 },
  { id: 19, name: 'Sukuma Kales', image: kalesImage, price: 100, quantityLabel: '500 grams', initialQuantity: 1 },
  { id: 20, name: 'Pumpkin', image: pumpkinImage, price: 200, quantityLabel: '500 grams', initialQuantity: 1 },
  { id: 21, name: 'Sweet Potatoes', image: sweetImage, price: 200, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 22, name: 'Spinach', image: spinachImage, price: 130, quantityLabel: '500 grams', initialQuantity: 1 },
];

const Vegetables = ({ onAddToBucket, onDone }) => {
  const [vegetables, setVegetables] = useState(initialVegetables);
  const [bucket, setBucket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleReadyMade = (id, newName, newImage, newPrice, newQuantityLabel) => {
    const updatedVegetables = vegetables.map(veg => {
      if (veg.id === id) {
        return {
          ...veg,
          id: `${id}-ready-made`,
          name: newName,
          image: newImage,
          price: newPrice,
          quantityLabel: newQuantityLabel,
          initialQuantity: 1,
        };
      }
      return veg;
    });
    setVegetables(updatedVegetables);
  };

  const filteredVegetables = vegetables.filter(veg =>
    veg.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="vegetables-container">
      <h2>Vegetables</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />
      <div className="product-list">
        {filteredVegetables.map((veg) => (
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
            {veg.name === 'Carrots' && (
              <button onClick={() => handleReadyMade(veg.id, 'Sliced Carrots', slicedCarrotsImage, 150, '500 grams')} className="ready-made-button">Sliced</button>
            )}
            {veg.name === 'Managu' && (
              <button onClick={() => handleReadyMade(veg.id, 'Ready to Cook', readyManaguImage, 30, 'Per Bunch')} className="ready-made-button">Ready to Cook</button>
            )}
            {veg.name === 'Cabbage' && (
              <button onClick={() => handleReadyMade(veg.id, 'Sliced Cabbage', slicedCabbageImage, 150, '500 grams')} className="ready-made-button">Sliced</button>
            )}
            {veg.name === 'Saga' && (
              <button onClick={() => handleReadyMade(veg.id, 'Ready to Cook', readySagaImage, 30, 'Per Bunch')} className="ready-made-button">Ready to Cook</button>
            )}
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







