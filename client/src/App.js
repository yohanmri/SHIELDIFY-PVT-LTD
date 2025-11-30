import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/clientPages/HomePage';
import ProductsPage from './pages/clientPages/ProductsPage';
import SolutionsPage from './pages/clientPages/SolutionsPage';
import ServicesPage from './pages/clientPages/ServicesPage';
import ContactPage from './pages/clientPages/ContactPage';
import AboutPage from './pages/clientPages/AboutPage'; 
import ProjectsPage from './pages/clientPages/ProjectsPage';
import AdminDashboard from './pages/adminPages/AdminDashboard';
import AdminProductList from './pages/adminPages/ProductList';
import './styles/global.css';
import { defineCustomElements } from '@esri/calcite-components/loader';
import AdminProductAdd from './pages/adminPages/ProductAdd';
import ShieldifyLogin from './pages/adminPages/LoginPage';
import AdminBundleList from './pages/adminPages/BundleList';
import AdminBundleAdd from './pages/adminPages/BundleAdd';
function App() {
  // Initialize Calcite Components
  useEffect(() => {
    defineCustomElements(window);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />

          {/* Admin Routes */}
          <Route path="admin/login" element={<ShieldifyLogin/>} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/product-list" element={<AdminProductList />} />
          <Route path="/admin/product-add" element={<AdminProductAdd />} /> 
            <Route path="/admin/bundle-list" element={<AdminBundleList />} /> 
          <Route path="/admin/bundle-add" element={<AdminBundleAdd />} /> 
          {/* <Route path="/admin/categories" element={<AdminProductList />} />  */}
       
          <Route path="/admin/orders" element={<AdminProductList />} /> 
          <Route path="/admin/orders/pending" element={<AdminProductList />} /> 
          <Route path="/admin/orders/completed" element={<AdminProductList />} /> 
          <Route path="/admin/refunds" element={<AdminProductList />} /> 
          <Route path="/admin/cancellations" element={<AdminProductList />} /> 
          <Route path="/admin/analytics/visitors" element={<AdminProductList />} /> 
          <Route path="/admin/analytics/live" element={<AdminProductList />} /> 
          <Route path="/admin/analytics/traffic" element={<AdminProductList />} /> 
          <Route path="/admin/analytics/pages" element={<AdminProductList />} /> 
          <Route path="/admin/analytics/devices" element={<AdminProductList />} /> 
          <Route path="/admin/activity" element={<AdminProductList />} /> 
          <Route path="/admin/stats" element={<AdminProductList />} /> 
          <Route path="/admin/settings" element={<AdminProductList />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;