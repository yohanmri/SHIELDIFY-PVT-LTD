import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/clientPages/HomePage';
import ProductsPage from './pages/clientPages/ProductsPage';
import ProductDetailsPage from './pages/clientPages/ProductDetailsPage'; // CHANGED: Use wrapper component
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
import AdminOrdersList from './pages/adminPages/OrdersList';
import AdminOrdersPending from './pages/adminPages/OrdersPending';
import AdminOrdersCompleted from './pages/adminPages/OrdersCompleted';
import AdminRequestsRefund from './pages/adminPages/RequestsRefund';
import AdminRequestsCancel from './pages/adminPages/RequestsCancel';
import TotalVisitors from './pages/adminPages/TotalVisitors';
import PopularPages from './pages/adminPages/PopularPages';
import DeviceLocations from './pages/adminPages/DeviceLocations';
import LiveVisitors from './pages/adminPages/LIveVisitors';
import RecentActivity from './pages/adminPages/RecentActivity';
import AdminProductDetail from './pages/adminPages/ProductDetails';

import CreateRole from './pages/adminPages/CreateRole';
import Settings from './pages/adminPages/Settings';
import AdminBundleDetail from './pages/adminPages/BundleDetails';
import BundlesPage from './pages/clientPages/BundlePage';
import BundleDetailsPage from './pages/clientPages/BundleDetailsPage';
function App() {
  // Initialize Calcite Components
  useEffect(() => {
    defineCustomElements(window);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* ============================================
              CLIENT SIDE ROUTES
              ============================================ */}
          
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/bundles" element={<BundlesPage />} />
           <Route path="/bundle/:id" element={<BundleDetailsPage />} />


          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />

          {/* ============================================
              ADMIN ROUTES
              ============================================ */}
          
          {/* Authentication */}
          <Route path="/admin/login" element={<ShieldifyLogin/>} />

          {/* Dashboard & Activity */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/recent-activity" element={<RecentActivity/>}/>

          {/* Product Management */}
          <Route path="/admin/product-list" element={<AdminProductList />} />
          <Route path="/admin/products/:id" element={<AdminProductDetail />} />
          <Route path="/admin/product-add" element={<AdminProductAdd />} />

          {/* Bundle Management */}
          <Route path="/admin/bundle-list" element={<AdminBundleList />} />
          <Route path="/admin/bundle-add" element={<AdminBundleAdd />} />
          <Route path="/admin/bundles/:id" element={<AdminBundleDetail />} />

          {/* Order Management */}
          <Route path="/admin/order-list" element={<AdminOrdersList />} />
          <Route path="/admin/order-completed" element={<AdminOrdersCompleted />} />
          <Route path="/admin/order-pending" element={<AdminOrdersPending />} />

          {/* Request Management */}
          <Route path="/admin/requests-refunds" element={<AdminRequestsRefund />} />
          <Route path="/admin/requests-cancel" element={<AdminRequestsCancel />} />

          {/* Analytics - Visitors */}
          <Route path="/admin/total-visitors" element={<TotalVisitors />} />
          <Route path="/admin/popular-pages" element={<PopularPages />} />
          <Route path="/admin/devices-locations" element={<DeviceLocations />} />
          <Route path="/admin/live-visitors" element={<LiveVisitors />} />



<Route path="/admin/roles" element={<CreateRole />} />
<Route path="/admin/settings" element={<Settings />} />

          {/* Future Analytics Routes (placeholder) */}
          {/* 
          <Route path="/admin/categories" element={<AdminProductList />} />
          <Route path="/admin/analytics/traffic" element={<AdminProductList />} />
          <Route path="/admin/analytics/pages" element={<AdminProductList />} />
          <Route path="/admin/activity" element={<AdminProductList />} />
          <Route path="/admin/stats" element={<AdminProductList />} />
          <Route path="/admin/settings" element={<AdminProductList />} />
          */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;