import React from 'react';
import PropTypes from 'prop-types';
import './Products.css';

const Products = ({ onAddToCart }) => {
  return (
    <div className="products-container">
      {/* Render your products */}
      <button onClick={() => onAddToCart(product)}>Add to Cart</button>
    </div>
  );
};

Products.propTypes = {
  onAddToCart: PropTypes.func.isRequired
};

export default Products;
