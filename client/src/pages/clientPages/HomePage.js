// HomePage.js
import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import HomeHero from '../../components/clientComponents/HomeHero';
import Footer from '../../components/clientComponents/Footer';
import HomeInitiatives from '../../components/clientComponents/HomeInitiatives';
import ProductCircle from '../../components/clientComponents/ProductCircle';

export default function HomePage() {
  return (
    <div className="home-page" style={{ 
      margin: 0, 
      padding: 0, 
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Navbar />
      <HomeHero />
      <HomeInitiatives />
      <ProductCircle />
      <Footer />
    </div>
  );
}