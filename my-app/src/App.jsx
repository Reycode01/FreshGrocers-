import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import coverImage from './assets/Front.jpeg';
import cartImage from './assets/cart.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Products from './Products';
import CustomerList from './CustomerList';
import CartDetails from './CartDetails';
import Modal from './Modal';
import Cereals from './Cereals';
import Vegetables from './Vegetables';
import Fruits from './Fruits';
import KitchenSauce from './KitchenSauce';

const App = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const [showCustomerList, setShowCustomerList] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarType, setCalendarType] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bucket, setBucket] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('cereals');
  const [showModal, setShowModal] = useState(false);

  const [menuActive, setMenuActive] = useState(false);

  const cerealsRef = useRef(null);
  const vegetablesRef = useRef(null);
  const fruitsRef = useRef(null);
  const kitchenSauceRef = useRef(null);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  useEffect(() => {
    const storedBucket = JSON.parse(localStorage.getItem('bucket')) || [];
    const storedTotalAmount = parseFloat(localStorage.getItem('totalAmount')) || 0;
    setBucket(storedBucket);
    setTotalAmount(storedTotalAmount);
  }, []);

  useEffect(() => {
    localStorage.setItem('bucket', JSON.stringify(bucket));
    localStorage.setItem('totalAmount', totalAmount.toString());
  }, [bucket, totalAmount]);

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
    setShowModal(true);
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

  const handleAddToBucket = (product) => {
    setBucket(prevBucket => {
      const existingProductIndex = prevBucket.findIndex(item => item.name === product.name);
      let updatedBucket;
      if (existingProductIndex >= 0) {
        updatedBucket = prevBucket.map((item, index) =>
          index === existingProductIndex
            ? { ...item, initialQuantity: (item.initialQuantity || 1) + (product.initialQuantity || 1) }
            : item
        );
      } else {
        updatedBucket = [...prevBucket, { ...product, initialQuantity: product.initialQuantity || 1 }];
      }
      const newTotalAmount = updatedBucket.reduce((sum, item) => sum + item.price * item.initialQuantity, 0);
      setTotalAmount(newTotalAmount);
      return updatedBucket;
    });
  };

  const handleDeleteFromBucket = (index) => {
    setBucket(prevBucket => {
      const updatedBucket = prevBucket.filter((_, i) => i !== index);
      const newTotalAmount = updatedBucket.reduce((sum, item) => sum + item.price * item.initialQuantity, 0);
      setTotalAmount(newTotalAmount);
      return updatedBucket;
    });
  };

  const handleCalculateTotal = () => {
    const newTotalAmount = bucket.reduce((sum, item) => sum + item.price * item.initialQuantity, 0);
    setTotalAmount(newTotalAmount);
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
        return <Cereals onAddToBucket={handleAddToBucket} onDone={handleCalculateTotal} />;
      case 'vegetables':
        return <Vegetables onAddToBucket={handleAddToBucket} onDone={handleCalculateTotal} />;
      case 'fruits':
        return <Fruits onAddToBucket={handleAddToBucket} onDone={handleCalculateTotal} />;
      case 'kitchensauce':
        return <KitchenSauce onAddToBucket={handleAddToBucket} onDone={handleCalculateTotal} />;
      default:
        return <Cereals onAddToBucket={handleAddToBucket} onDone={handleCalculateTotal} />;
    }
  };

  return (
    <div className="app-container">
      <header className="App-header">
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="menu-toggle" onClick={toggleMenu}>
            &#9776;
          </div>
          <div className={`nav-items ${menuActive ? 'active' : ''}`}>
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
              <span className="cart-badge">
                {bucket.reduce((acc, item) => acc + (item.initialQuantity || 1), 0)}
              </span>
            </div>
          </div>
        </motion.nav>
      </header>

      <main className="main-content">
        <motion.div
          className="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {!showAbout && !showProducts && !showCartDetails && !showCustomerList && (
            <>
              <h1 className="dancing-script stylish-text">Pika Nasi</h1>

              <img src={coverImage} alt="Cover Image" className="cover-image" />
              <div className="delivery-info">
                <h2>Order Delivery Near You</h2>
                <p>Enter your delivery address to get started</p>
                <button className="address-btn">Enter Delivery Address</button>
                <button className="delivery-btn" onClick={handleDeliverNowClick}>Deliver Now</button>
                <button className="delivery-btn" onClick={handleScheduleLaterClick}>Schedule Later</button>
              </div>
              {showCalendar && (
                <motion.div
                  className="calendar-popup"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
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
                </motion.div>
              )}
            </>
          )}
          {showAbout && (
            <motion.div
              className="about-us"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* ... About Us content ... */}
            </motion.div>
          )}
          {showProducts && <Products onAddToBucket={handleAddToBucket} onDone={handleCalculateTotal} />}
          {showCartDetails && <CartDetails cart={bucket} totalAmount={totalAmount} onDeleteFromBucket={handleDeleteFromBucket} />}
          {showCustomerList && <CustomerList cart={bucket} totalAmount={totalAmount} onDeleteFromBucket={handleDeleteFromBucket} />}
        </motion.div>
        <div className="categories-container">
          <div ref={cerealsRef} className="category-section">
            {selectedCategory === 'cereals' && renderCategory()}
          </div>
          <div ref={vegetablesRef} className="category-section">
            {selectedCategory === 'vegetables' && renderCategory()}
          </div>
          <div ref={fruitsRef} className="category-section">
            {selectedCategory === 'fruits' && renderCategory()}
          </div>
          <div ref={kitchenSauceRef} className="category-section">
            {selectedCategory === 'kitchensauce' && renderCategory()}
          </div>
        </div>
      </main>

      <Modal show={showModal} handleClose={() => setShowModal(false)}>
        <CartDetails cart={bucket} totalAmount={totalAmount} onDeleteFromBucket={handleDeleteFromBucket} />
      </Modal>

      <footer className="footer">
        <p>&copy; 2024 Pika Nasi. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;










