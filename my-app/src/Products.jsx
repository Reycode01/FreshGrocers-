import React, { useState } from 'react';
import bucketImage from './assets/Bucket.jpeg';
import bananaImage from './assets/banana.jpg';
import beansImage from './assets/Beans Busket.png';
import onionsImage from './assets/Fresh ball onions.jpg';
import mangoesImage from './assets/mangoes.png';
import grainedMaizeImage from './assets/Maize.jpeg';
import managuImage from './assets/managu.jpg';
import pineapplesImage from './assets/pineaples.jpg';
import potatoesImage from './assets/potatoes.png';
import peasImage from './assets/Peas.jpg';
import sagaImage from './assets/saga.jpg';
import tomatoesImage from './assets/tomatoes.jpg';
import sauceImage from './assets/tomatoes collections.jpeg';
import sweetBananasImage from './assets/Sweetbananas.jpg';
import './Products.css';

const initialProducts = [
  { id: 1, name: 'Fresh Maize', image: bucketImage, price: 350, quantityLabel: '20pcs', initialQuantity: 1 },
  { id: 2, name: 'Banana', image: bananaImage, price: 15, quantityLabel: '@', initialQuantity: 1 },
  { id: 3, name: 'French Beans', image: beansImage, price: 300, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 4, name: 'Onions', image: onionsImage, price: 10, quantityLabel: '@', initialQuantity: 1 },
  { id: 5, name: 'Mangoes', image: mangoesImage, price: 20, quantityLabel: '@', initialQuantity: 1 },
  { id: 6, name: 'Grained Maize', image: grainedMaizeImage, price: 100, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 7, name: 'Managu', image: managuImage, price: 20, quantityLabel: 'per Bunch', initialQuantity: 1 },
  { id: 8, name: 'Pineapple', image: pineapplesImage, price: 100, quantityLabel: '@', initialQuantity: 1 },
  { id: 9, name: 'Potatoes', image: potatoesImage, price: 250, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 10, name: 'Peas', image: peasImage, price: 250, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 11, name: 'Saga', image: sagaImage, price: 20, quantityLabel: 'per Bunch', initialQuantity: 1 },
  { id: 12, name: 'Tomatoes', image: tomatoesImage, price: 15, quantityLabel: 'each', initialQuantity: 1 },
  { id: 13, name: 'Bucket of Kitchen Sauce', image: sauceImage, price: 300, quantityLabel: 'per Kg', initialQuantity: 1 },
  { id: 14, name: 'Sweet Bananas', image: sweetBananasImage, price: 300, quantityLabel: 'Bunch of 20', initialQuantity: 1 },
];

function Products({ onAddToBucket, onDone }) {
  const [products, setProducts] = useState(initialProducts);
  const [bucket, setBucket] = useState([]);

  const handleQuantityChange = (id, increment) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        const newQuantity = product.initialQuantity + increment;
        return { ...product, initialQuantity: newQuantity > 0 ? newQuantity : 1 };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const handleAddToBucket = (product) => {
    const existingProduct = bucket.find(item => item.id === product.id);
    let updatedBucket;

    if (existingProduct) {
      updatedBucket = bucket.map(item =>
        item.id === product.id ? { ...item, initialQuantity: item.initialQuantity + product.initialQuantity } : item
      );
    } else {
      updatedBucket = [...bucket, product];
    }

    setBucket(updatedBucket);

    const newTotalAmount = updatedBucket.reduce((acc, item) => acc + item.price * item.initialQuantity, 0);
    onAddToBucket(updatedBucket, newTotalAmount); // Pass the updated bucket and total to the parent
  };

  const handleCalculateTotal = () => {
    const total = bucket.reduce((acc, product) => acc + product.price * product.initialQuantity, 0);
    onDone(bucket, total); // Pass the bucket and total to the parent
  };

  return (
    <div className="products-container">
      <h2>Our Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p className="product-price">Ksh. {product.price}</p>
            <p className="product-quantity">Quantity: {product.quantityLabel}</p>
            <div className="quantity-controls">
              <button onClick={() => handleQuantityChange(product.id, -1)}>-</button>
              <span>{product.initialQuantity}</span>
              <button onClick={() => handleQuantityChange(product.id, 1)}>+</button>
            </div>
            <p>Total Price: Ksh. {product.price * product.initialQuantity}</p>
            <button onClick={() => handleAddToBucket(product)} className="add-to-bucket">Add to Bucket</button>
          </div>
        ))}
      </div>
      <button onClick={handleCalculateTotal} className="cart-btn">Done</button>
    </div>
  );
}

export default Products;



