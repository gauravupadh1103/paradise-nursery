
import React from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import AboutUs from './AboutUs.jsx';
import ProductList from './ProductList.jsx';
import CartItem from './CartItem.jsx';

function Home() {
  const navigate = useNavigate();

  return (
    <main className="hero">
      <div className="hero-content">
        <p className="eyebrow">BRING NATURE HOME</p>
        <h1>Paradise Nursery</h1>
        <h2>Find your perfect green companion.</h2>
        <p>
          Discover beautiful houseplants that make your home
          fresher, greener, and more welcoming.
        </p>
        <button onClick={() => navigate('/plants')}>
          Get Started
        </button>
        <Link to="/about">About Us</Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/plants" element={<ProductList />} />
      <Route path="/cart" element={<CartItem />} />
    </Routes>
  );
}
