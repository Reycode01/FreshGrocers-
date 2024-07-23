import React from 'react';
import './CategorySelection.css'; // Add your styles here

const CategorySelection = ({ onCategoryChange }) => {
  return (
    <div className="category-selection">
      <button onClick={() => onCategoryChange('fruits')}>Fruits</button>
      <button onClick={() => onCategoryChange('vegetables')}>Vegetables</button>
      <button onClick={() => onCategoryChange('cereals')}>Cereals</button>
      <button onClick={() => onCategoryChange('kitchenSauce')}>Kitchen Sauce</button>
    </div>
  );
};

export default CategorySelection;
