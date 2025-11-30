// ============================================
// FILE: ProductDetailsPage.js
// Path: src/pages/clientPages/ProductDetailsPage.js
// ============================================
import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import Footer from '../../components/clientComponents/Footer';
import ProductDetails from '../../components/clientComponents/ProductDetails';
import '@esri/calcite-components/dist/calcite/calcite.css';
import '../../styles/clientStyles/productDetails.css';

export default function ProductDetailsPage() {
  return (
    <div 
      className="product-details-page-wrapper"
      style={{
        marginTop: '4%',
        padding: 0,
        width: '100%',
        maxWidth: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <Navbar activePage="products" />
      <ProductDetails />
      <Footer />
    </div>
  );
}