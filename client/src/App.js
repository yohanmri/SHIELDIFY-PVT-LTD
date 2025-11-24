import React, { useState, useEffect } from 'react';
import HomePage from './pages/clientPages/HomePage';
import ProductsPage from './pages/clientPages/ProductsPage';
import SolutionsPage from './pages/clientPages/SolutionsPage';
import ServicesPage from './pages/clientPages/ServicesPage';
import ContactPage from './pages/clientPages/ContactPage';
import AboutPage from './pages/clientPages/AboutPage'; 
import ProjectsPage from './pages/clientPages/ProjectsPage';
import './styles/global.css';
import { defineCustomElements } from '@esri/calcite-components/loader';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Initialize Calcite Components
  useEffect(() => {
    defineCustomElements(window);
  }, []);

  console.log('Current Page:', currentPage);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setPage={setCurrentPage} />;
              case 'products':
        return <ProductsPage setPage={setCurrentPage} />;
      case 'solutions':
        return <SolutionsPage setPage={setCurrentPage} />;
      case 'services':
        return <ServicesPage setPage={setCurrentPage} />;
      case 'contact':
        return <ContactPage setPage={setCurrentPage} />;

      case 'about':
        return <AboutPage setPage={setCurrentPage} />;
      case 'projects':
        return <ProjectsPage setPage={setCurrentPage} />;
      default:
        return <HomePage setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;