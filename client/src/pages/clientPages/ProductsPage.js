import React from 'react';
import Navbar from '../../components/clientComponents/Navbar';
import Footer from '../../components/clientComponents/Footer';
import ProductsComponent from '../../components/clientComponents/ProductsCard'; 
import '@esri/calcite-components/dist/calcite/calcite.css';
import ProductCircle from '../../components/clientComponents/ProductCircle';

export default function ProductsPage({ setPage }) {
  return (
    <div className="products-page" style={{
      margin: 0,
      padding: 0,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      position: 'relative'
    }}>
      <Navbar setPage={setPage} activePage="products" />
      
      <ProductsComponent setPage={setPage} />
      <ProductCircle />
      <Footer />
    </div>
  );
}