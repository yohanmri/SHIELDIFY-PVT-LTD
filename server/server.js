require('dotenv').config(); // MUST be first
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Routes
const productRoutes = require('./routes/productRoutes');
const adminProductRoutes = require('./routes/adminProductRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const adminBundleRoutes = require('./routes/adminBundleRoutes')
const bundleRoutes = require('./routes/bundleRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser with increased limits
app.use(express.json({ limit: '50mb' })); // Increased from default 100kb
app.use(express.urlencoded({ limit: '50mb', extended: true })); // Increased from default 100kb
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/products', productRoutes); 
app.use('/api/bundles', bundleRoutes);
app.use('/api/admin/products', adminProductRoutes); 
app.use('/api/auth', authRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/admin/bundles', adminBundleRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SHIELDIFY Safety Equipment API' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  // Handle PayloadTooLargeError specifically
  if (err.type === 'entity.too.large') {
    return res.status(413).json({
      success: false,
      message: 'File or request is too large. Maximum size is 50MB.'
    });
  }
  
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});