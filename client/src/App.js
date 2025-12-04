import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/clientPages/HomePage';
import ProductsPage from './pages/clientPages/ProductsPage';
import ProductDetailsPage from './pages/clientPages/ProductDetailsPage';
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
import { trackPageView } from './utils/analytics';
import ProtectedRoute from './components/ProtectedRoute';
import ContactViewPage from './pages/adminPages/ContactViewPage';
import { CartProvider } from './context/CartContext';

// Analytics Tracker Component
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page view on route change, but only for public pages
    const isAdminRoute = location.pathname.startsWith('/admin');

    if (!isAdminRoute) {
      trackPageView();
    }
  }, [location]);

  return null;
}

function App() {
  // Initialize Calcite Components
  useEffect(() => {
    defineCustomElements(window);
  }, []);

  return (
    <CartProvider>
      <Router>
        <AnalyticsTracker />
        <div className="App">
          <Routes>
            {/* ============================================
              CLIENT SIDE ROUTES (Public - No Protection)
              ============================================ */}

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
              ADMIN AUTHENTICATION (Public Route)
              ============================================ */}

            <Route
              path="/admin/login"
              element={<ShieldifyLogin />}
            />

            {/* ============================================
              PROTECTED ADMIN ROUTES
              ============================================ */}

            {/* Dashboard & Activity */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/recent-activity"
              element={
                <ProtectedRoute>
                  <RecentActivity />
                </ProtectedRoute>
              }
            />

            {/* Product Management */}
            <Route
              path="/admin/product-list"
              element={
                <ProtectedRoute>
                  <AdminProductList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products/:id"
              element={
                <ProtectedRoute>
                  <AdminProductDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/product-add"
              element={
                <ProtectedRoute>
                  <AdminProductAdd />
                </ProtectedRoute>
              }
            />

            {/* Bundle Management */}
            <Route
              path="/admin/bundle-list"
              element={
                <ProtectedRoute>
                  <AdminBundleList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bundle-add"
              element={
                <ProtectedRoute>
                  <AdminBundleAdd />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/bundles/:id"
              element={
                <ProtectedRoute>
                  <AdminBundleDetail />
                </ProtectedRoute>
              }
            />

            {/* Order Management */}
            <Route
              path="/admin/order-list"
              element={
                <ProtectedRoute>
                  <AdminOrdersList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/order-completed"
              element={
                <ProtectedRoute>
                  <AdminOrdersCompleted />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/order-pending"
              element={
                <ProtectedRoute>
                  <AdminOrdersPending />
                </ProtectedRoute>
              }
            />

            {/* Request Management */}
            <Route
              path="/admin/requests-refunds"
              element={
                <ProtectedRoute>
                  <AdminRequestsRefund />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/requests-cancel"
              element={
                <ProtectedRoute>
                  <AdminRequestsCancel />
                </ProtectedRoute>
              }
            />

            {/* Analytics - Visitors */}
            <Route
              path="/admin/total-visitors"
              element={
                <ProtectedRoute>
                  <TotalVisitors />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/popular-pages"
              element={
                <ProtectedRoute>
                  <PopularPages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/devices-locations"
              element={
                <ProtectedRoute>
                  <DeviceLocations />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/live-visitors"
              element={
                <ProtectedRoute>
                  <LiveVisitors />
                </ProtectedRoute>
              }
            />

            {/* Roles & Settings */}
            <Route
              path="/admin/roles"
              element={
                <ProtectedRoute>
                  <CreateRole />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/contact-view"
              element={
                <ProtectedRoute>
                  <ContactViewPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;