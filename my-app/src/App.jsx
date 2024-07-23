import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import coverImage from './assets/Front.jpeg';
import cartImage from './assets/cart.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Products from './Products';
import CustomerList from './CustomerList';
import CartDetails from './CartDetails';
import Cereals from './Cereals';
import Vegetables from './Vegetables';
import Fruits from './Fruits';
import KitchenSauce from './KitchenSauce';
import './App.css';

const App = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [showCustomerList, setShowCustomerList] = useState(false);
  const [showCalendar, setShowCalendar]= useState(false);
  const [calendarType, setCalendarType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bucket, setBucket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('cereals');

  const cerealsRef = useRef(null);
  const vegetablesRef = useRef(null);
  const fruitsRef = useRef(null);
  const kitchenSauceRef = useRef(null);

  const handleAboutClick = () => {
    setShowAbout(true);
    setShowProducts(false);
    setShowCartDetails(false);
    setShowCustomerList(false);
  };

  const handleProductsClick = () => {
    setShowProducts(true);
    setShowAbout(false);
    setShowCartDetails(false);
    setShowCustomerList(false);
  };

  const handleCartClick = () => {
    setShowCartDetails(true);
    setShowAbout(false);
    setShowProducts(false);
    setShowCustomerList(false);
  };

  const handleCustomerListClick = () => {
    setShowCustomerList(true);
    setShowAbout(false);
    setShowProducts(false);
    setShowCartDetails(false);
  };

  const handleScheduleLaterClick = () => {
    setCalendarType('schedule-later');
    setShowCalendar(true);
  };

  const handleDeliverNowClick = () => {
    setCalendarType('deliver-now');
    setShowCalendar(true);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleAddToBucket = (updatedBucket, newTotalAmount) => {
    setBucket(updatedBucket);
    setTotalAmount(newTotalAmount);
  };

  const handleCalculateTotal = (bucket, total) => {
    setBucket(bucket);
    setTotalAmount(total);
    setShowCartDetails(true);
  };

  const handleScrollToCategory = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth'
    });
  };

  const renderCategory = () => {
    switch (selectedCategory) {
      case 'cereals':
        return <Cereals />;
      case 'vegetables':
        return <Vegetables />;
      case 'fruits':
        return <Fruits />;
      case 'kitchensauce':
        return <KitchenSauce />;
      default:
        return <Cereals />;
    }
  };

  return (
    <div className="app-container">
      <header className="App-header">
        <nav>
          <div className="nav-items">
            <ul>
              <li><a href="#cereals" onClick={() => {
                setSelectedCategory('cereals');
                handleScrollToCategory(cerealsRef);
              }}>Cereals</a></li>
              <li><a href="#vegetables" onClick={() => {
                setSelectedCategory('vegetables');
                handleScrollToCategory(vegetablesRef);
              }}>Vegetables</a></li>
              <li><a href="#fruits" onClick={() => {
                setSelectedCategory('fruits');
                handleScrollToCategory(fruitsRef);
              }}>Fruits</a></li>
              <li><a href="#kitchensauce" onClick={() => {
                setSelectedCategory('kitchensauce');
                handleScrollToCategory(kitchenSauceRef);
              }}>Kitchen Sauce</a></li>
              <li><a href="#" onClick={handleCustomerListClick}>Customer List</a></li>
            </ul>
            <div className="cart-icon-container" onClick={handleCartClick}>
              <img src={cartImage} alt="Cart" className="cart-icon" />
              <span className="cart-badge">{bucket.reduce((acc, item) => acc + item.initialQuantity, 0)}</span>
            </div>
          </div>
        </nav>
      </header>

      <main className="main-content">
        <div className="content">
          {!showAbout && !showProducts && !showCartDetails && !showCustomerList && (
            <>
              <h1>Welcome to FreshGrocers!</h1>
              <img src={coverImage} alt="Cover Image" className="cover-image" />
              <div className="delivery-info">
                <h2>Order Delivery Near You</h2>
                <p>Enter your delivery address to get started</p>
                <button className="address-btn">Enter Delivery Address</button>
                <button className="delivery-btn" onClick={handleDeliverNowClick}>Deliver Now</button>
                <button className="delivery-btn" onClick={handleScheduleLaterClick}>Schedule Later</button>
              </div>
              {showCalendar && (
                <div className="calendar-popup">
                  <h2>Schedule Your Delivery</h2>
                  <DatePicker
                    selected={selectedDate}
                    onChange={handleDateChange}
                    showTimeSelect
                    dateFormat="Pp"
                    minDate={calendarType === 'deliver-now' ? new Date() : undefined}
                    maxDate={calendarType === 'deliver-now' ? new Date(Date.now() + 24 * 60 * 60 * 1000) : undefined}
                    placeholderText="Select a date"
                  />
                  <button className="delivery-btn" onClick={() => setShowCalendar(false)}>Confirm Schedule</button>
                </div>
              )}
            </>
          )}
          {showAbout && (
            <div className="about-us">
              {/* ... About Us content ... */}
            </div>
          )}
          {showProducts && <Products onAddToBucket={handleAddToBucket} onDone={handleCalculateTotal} />}
          {showCartDetails && <CartDetails bucket={bucket} totalAmount={totalAmount} />}
          {showCustomerList && <CustomerList bucket={bucket} />}
        </div>
        <div ref={cerealsRef}>{renderCategory()}</div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 FreshGrocers. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;






